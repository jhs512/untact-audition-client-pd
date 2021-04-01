<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="flex flex-col min-h-screen mb-20">

     <TitleBar title="Audictionary" btn_back="true"></TitleBar>

    <div class="flex flex-col mt-4 container mx-auto">
      
      <form action="" v-on:submit.prevent="checkAndModify" class="mx-4">

        <FormRow title="이름:">
          <ion-input v-model="input.nameEl" ref="nameElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="비밀번호:">
          <ion-input v-model="input.loginPwEl" ref="loginPwElRef" type="password"></ion-input>
        </FormRow>

        <FormRow title="주소:">
          <ion-input v-model="input.addressEl" ref="addressElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="전화번호:">
          <ion-input v-model="input.cellPhoneNoEl" ref="cellPhoneNoElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="직급:">
          <ion-input v-model="input.jobPositionEl" ref="jobPositionElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="회사:">
          <ion-input v-model="input.corpNameEl" ref="corpNameElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="프로필 이미지:">
            <ion-input v-model="input.fileEl" @ionChange="setProfileImg($event)" type="file" accept="image/*"></ion-input>
        </FormRow>
        <input accept="true" type="submit" class="w-full mt-10 text-center btn-next text-xs mx-auto p-2">
      </form>
      </div>
    </div>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { IonPage, IonContent, IonIcon, IonInput } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import router from '@/router'
import { MainApi, useMainApi } from '../../apis'
import { sha256 } from 'js-sha256'
import { useGlobalShare } from '@/stores'
import * as Util from '@/utils'
import { useMainService } from '@/services'
import axios from 'axios'

export default defineComponent({
  name: 'JoinSelectPage',
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonInput
  },
  props: {

  },
  setup(props) {
    const mainApiService = useMainService();
    const globalState = useGlobalShare();

    
    const nameElRef = ref<HTMLInputElement>();
    const loginPwElRef = ref<HTMLInputElement>();
    const addressElRef = ref<HTMLInputElement>();
    const cellPhoneNoElRef = ref<HTMLInputElement>();
    const jobPositionElRef = ref<HTMLInputElement>();
    const corpNameElRef = ref<HTMLInputElement>();
    
    const input = reactive({
      nameEl:globalState.loginedMember.name,
      loginPwEl:'',
      addressEl:globalState.loginedMember.address,
      cellPhoneNoEl:globalState.loginedMember.cellPhoneNo,
      jobPositionEl:globalState.loginedMember.jobPosition,
      corpNameEl:globalState.loginedMember.corpName,
      fileEl: new File([""],""),
    })

  
   function setProfileImg(event:any){
        input.fileEl = event.target.children[0].files[0];
   }

  let isFileUploaded = false;

    function checkAndModify() {
      let loginPwRealEl = '';
        if (input.loginPwEl.length > 0 ){
          loginPwRealEl = sha256(input.loginPwEl);
        }
        
      const startModify = () => {

        if ( input.fileEl != null && input.fileEl.size > 0) {
          isFileUploaded = true;
        }

         modify(Util.toStringOrNull(globalState.loginedMember.id), input.nameEl, loginPwRealEl, input.addressEl,  input.cellPhoneNoEl, input.jobPositionEl, input.corpNameEl, isFileUploaded);

      }

      startModify();

    }

    function modify(loginedMemberId:string, name:string, loginPwReal:string, address:string, cellPhoneNo:string,  jobPosition:string, corpName:string, isFileUploaded:boolean ){
         mainApiService.pd_doModify( loginedMemberId, name, loginPwReal, address, cellPhoneNo, jobPosition, corpName, isFileUploaded )
        .then(axiosResponse => {
          Util.showAlert("알림",axiosResponse.data.msg, () => { 
            if( !!!isFileUploaded ) { 
              location.replace('/usr/pd/info'); 
              }else { null } 
            });
          if ( axiosResponse.data.fail ) {
            return;
          }
        
        const loginedPd = axiosResponse.data.body.pd;
          
          if( loginedPd.name != null ){
              localStorage.removeItem("loginedMemberName");
          }
          if( loginedPd.cellPhoneNo != null ){
              localStorage.removeItem("loginedMemberCellPhoneNo");
          }
          if( loginedPd.address != null ){
              localStorage.removeItem("loginedMemberAddress");
          }
          if( loginedPd.jobPosition != null ){
              localStorage.removeItem("loginedMemberJobPosition");
          }
          if( loginedPd.corpName != null ){
              localStorage.removeItem("loginedMemberCorpName");
          }
          if( loginedPd.extra__thumbImg != null ){
              localStorage.removeItem("loginedMemberExtra__thumbImg");
          }
          
          localStorage.setItem("loginedMemberId", loginedPd.id + "");
          localStorage.setItem("loginedMemberName", loginedPd.name);
          localStorage.setItem("loginedMemberCellPhoneNo", loginedPd.cellPhoneNo);
          localStorage.setItem("loginedMemberAddress", loginedPd.address);
          localStorage.setItem("loginedMemberJobPosition", loginedPd.jobPosition);
          localStorage.setItem("loginedMemberCorpName", loginedPd.corpName);
          localStorage.setItem("loginedMemberExtra__thumbImg", loginedPd.extra__thumbImg);
          
          if ( isFileUploaded ){
            doFileUpload();
          }
          
    });
      }


     function doFileUpload(){
        if(globalState.loginedMember.id == null){
          return;
        }

        mainApiService.common_pdGenFile_doUpload(input.fileEl, Util.toStringOrNull(globalState.loginedMember.id))
          .then(axiosResponse => {
            if ( axiosResponse.data.fail ) {
              location.replace('/usr/pd/info');
              return;
            }

            mainApiService.pd_update(Util.toStringOrNull(globalState.loginedMember.id))
            .then( axiosResponse => {
              if(axiosResponse.data.fail){
                return;
              }
              const loginedPd = axiosResponse.data.body.pd;
          
          if( loginedPd.name != null ){
              localStorage.removeItem("loginedMemberName");
          }
          if( loginedPd.cellPhoneNo != null ){
              localStorage.removeItem("loginedMemberCellPhoneNo");
          }
          if( loginedPd.address != null ){
              localStorage.removeItem("loginedMemberAddress");
          }
          if( loginedPd.jobPosition != null ){
              localStorage.removeItem("loginedMemberJobPosition");
          }
          if( loginedPd.corpName != null ){
              localStorage.removeItem("loginedMemberCorpName");
          }
          if( loginedPd.extra__thumbImg != null ){
              localStorage.removeItem("loginedMemberExtra__thumbImg");
          }
          
          localStorage.setItem("loginedMemberId", loginedPd.id + "");
          localStorage.setItem("loginedMemberName", loginedPd.name);
          localStorage.setItem("loginedMemberCellPhoneNo", loginedPd.cellPhoneNo);
          localStorage.setItem("loginedMemberAddress", loginedPd.address);
          localStorage.setItem("loginedMemberJobPosition", loginedPd.jobPosition);
          localStorage.setItem("loginedMemberCorpName", loginedPd.corpName);
          localStorage.setItem("loginedMemberExtra__thumbImg", loginedPd.extra__thumbImg);
          location.replace('/usr/pd/info');

            })
            
          });
        }

    return { 
      input,
      nameElRef,
      loginPwElRef,
      addressElRef,
      cellPhoneNoElRef,
      jobPositionElRef,
      corpNameElRef,
      checkAndModify,
      modify,
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