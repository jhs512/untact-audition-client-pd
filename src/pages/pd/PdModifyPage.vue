<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="flex flex-col min-h-screen mb-20">

     <TitleBar title="Audictionary">
      <div class="hisback absolute left-5" v-on:click="hisback"><ion-icon :icon="returnUpBackOutline"></ion-icon></div>
    </TitleBar>

    <div class="flex flex-col mt-4 container mx-auto">
      
      <form action="" v-on:submit.prevent="checkAndModify" class="mx-4">
        <input type="hidden" ref="loginedMemberIdRef" :value="globalState.loginedMember.id">

        <FormRow title="이름:">
          <input type="text" ref="nameElRef" :value="globalState.loginedMember.name" class="w-full">
        </FormRow>

        <FormRow title="비밀번호:">
          <input type="hidden" ref="loginPwRealElRef">
          <input type="password" ref="loginPwElRef" class="w-full">
        </FormRow>

        <FormRow title="주소:">
          <input type="text" ref="addressElRef" :value="globalState.loginedMember.address" class="w-full">
        </FormRow>

        <FormRow title="전화번호:">
          <input type="text" ref="cellPhoneNoElRef" :value="globalState.loginedMember.cellPhoneNo" class="w-full">
        </FormRow>

        <FormRow title="직급:">
          <input type="text" ref="jobPositionElRef" :value="globalState.loginedMember.jobPosition" class="w-full">
        </FormRow>

        <FormRow title="회사:">
          <input type="text" ref="corpNameElRef" :value="globalState.loginedMember.corpName" class="w-full">
        </FormRow>

        <FormRow title="프로필 이미지:">
            <ion-input @ionChange="setProfileImg($event)" ref="ionInputElRef" type="file" accept="image/*"></ion-input>
        </FormRow>
        <input accept="true" type="submit" class="w-full mt-10 text-center btn-next text-xs mx-auto p-2">
      </form>
      </div>
    </div>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, Ref, ref } from 'vue'
import { IonPage, IonContent, IonIcon, IonInput } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import { Router } from 'vue-router'
import { MainApi, useMainApi } from '../../apis'
import { sha256 } from 'js-sha256'

export default defineComponent({
  name: 'JoinSelectPage',
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonInput
  },
  props: {
    globalState: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = useMainApi();

    const loginedMemberIdRef = ref<HTMLInputElement>();
    const nameElRef = ref<HTMLInputElement>();
    const loginPwElRef = ref<HTMLInputElement>();
    const loginPwRealElRef = ref<HTMLInputElement>();
    const addressElRef = ref<HTMLInputElement>();
    const cellPhoneNoElRef = ref<HTMLInputElement>();
    const jobPositionElRef = ref<HTMLInputElement>();
    const corpNameElRef = ref<HTMLInputElement>();
    
    let pdProfileImg:File;

   function setProfileImg(event:any){
        pdProfileImg = event.target.children[0].files[0];
   }

    function checkAndModify() {

      const loginedMemberId = loginedMemberIdRef.value;
      if(loginedMemberId == null) {
        return;
      }
      
      const nameEl = nameElRef.value;
      if(nameEl == null) {
        return;
      }

      const loginPwRealEl = loginPwElRef.value;
      if ( loginPwRealEl == null ){
        return;
      }
      if (loginPwElRef.value != null){
        const loginPwEl = loginPwElRef.value;  
        
        if (loginPwEl.value.length != 0 ){
          loginPwRealEl.value = sha256(loginPwEl.value);
        }
        
      }

      const addressEl = addressElRef.value;
      if(addressEl == null) {
        return;
      }

      const cellPhoneNoEl = cellPhoneNoElRef.value;
      if(cellPhoneNoEl == null) {
        return;
      }

      const jobPositionEl = jobPositionElRef.value;
      if(jobPositionEl == null) {
        return;
      }

      const corpNameEl = corpNameElRef.value;
      if(corpNameEl == null) {
        return;
      }

    
      const startModify = () => {
        modify(loginedMemberId.value, nameEl.value, loginPwRealEl.value, addressEl.value,  cellPhoneNoEl.value, jobPositionEl.value, corpNameEl.value );
        if ( pdProfileImg != null ) {
          doFileUpload();
          return;
        }
      }
         
        function doFileUpload(){
        if(loginedMemberId == null){
          return;
        }
        mainApi.common_pdGenFile_doUpload(pdProfileImg,loginedMemberId.value)
          .then(axiosResponse => {
            if ( axiosResponse.data.fail ) {
              alert(axiosResponse.data.msg);
              return;
            }
            else {
              
            }
          });
        }
      startModify();     
    }  

    function modify(loginedMemberId:string, name:string, loginPwReal:string, address:string, cellPhoneNo:string,  jobPosition:string, corpName:string ){
         mainApi.pd_doModify( loginedMemberId, name, loginPwReal, address, cellPhoneNo, jobPosition, corpName )
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }

          const authKey = axiosResponse.data.body.authKey;
          const loginedPd = axiosResponse.data.body.pd;
          
          if( name != null ){
              localStorage.removeItem("loginedMemberName");
          }
          if( cellPhoneNo != null ){
              localStorage.removeItem("loginedMemberCellPhoneNo");
          }
          if( address != null ){
              localStorage.removeItem("loginedMemberAddress");
          }
          if( jobPosition != null ){
              localStorage.removeItem("loginedMemberJobPosition");
          }
          if( corpName != null ){
              localStorage.removeItem("loginedMemberCorpName");
          }
         
         

          localStorage.setItem("authKey", authKey);
          localStorage.setItem("loginedMemberId", loginedPd.id + "");
          localStorage.setItem("loginedMemberName", loginedPd.name);
          localStorage.setItem("loginedMemberCellPhoneNo", loginedPd.cellPhoneNo);
          localStorage.setItem("loginedMemberAddress", address);
          localStorage.setItem("loginedMemberJobPosition", jobPosition);
          localStorage.setItem("loginedMemberCorpName", corpName);
          localStorage.setItem("loginedMemberProfileImgUrl", loginedPd.extra__thumbImg);
  

          props.globalState.loginedMember = {
            authKey,
            id:loginedPd.id,
            name:loginedPd.name,
            address:loginedPd.address,
            email:loginedPd.email,
            cellPhoneNo:loginedPd.cellPhoneNo,
            jobPosition:loginedPd.jobPosition,
            corpName:loginedPd.corpName,
            corpType:loginedPd.corpType,
            profileImgUrl:loginedPd.extra__thumbImg
          };

          router.replace('/usr/pd/info');
    });
      }

    function hisback(){
      router.back();
    }

    return { 
      loginedMemberIdRef,
      nameElRef,
      loginPwElRef,
      loginPwRealElRef,
      addressElRef,
      cellPhoneNoElRef,
      jobPositionElRef,
      corpNameElRef,
      checkAndModify,
      modify,
      hisback,
      returnUpBackOutline,
      setProfileImg
    }
  }
  
})
</script>

<style scoped>
input, ion-input {
  border:2px solid #D4D4D4;
}
</style>