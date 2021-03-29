<template>

<ion-page>
  <ion-content :fullscreen="true">
  <div class="flex flex-col min-h-screen mb-20">

    <TitleBar title="Audictionary">
      <div class="hisback absolute left-5" v-on:click="hisback"><ion-icon :icon="returnUpBackOutline"></ion-icon></div>
    </TitleBar>

    <div class="flex flex-col mt-4 container mx-auto border-t border-b py-2">
      <div class="flex flex-col mx-auto text-center">
        <span>{{globalState.loginedMember.name}}</span>
        <span>{{globalState.loginedMember.email}}</span>
        <span>{{globalState.loginedMember.cellPhoneNo}}</span>
        <span>{{globalState.loginedMember.address}}</span>
        <span>{{globalState.loginedMember.jobPosition}}</span>
        <span>{{globalState.loginedMember.corpName}}</span>

      <div v-if="globalState.loginedMember.extra__thumbImg != null" class="img-container mx-4 mb-4 p-4 mt-6">  
        <img :src="globalState.loginedMember.extra__thumbImg" class="mx-auto">
      </div>

        <router-link to="/usr/pd/modify"><div class="btn-modify border-2 mt-2 border-black text-xs">프로필 편집</div></router-link>

        <div class="mt-2">
          <form action="" >
            <input type="hidden" ref="loginedMemberIdRef" :value="globalState.loginedMember.id">
            <input type="button" value="회원탈퇴" v-on:click="presentAlertConfirm($event)">
          </form>
          <div class="my-6" v-on:click="globalState.logout">로그아웃</div>

        </div>
      </div>
    </div>
  </div>

  </ion-content>
  <BottomBar></BottomBar>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from 'vue'
import { IonPage, IonContent, IonIcon, alertController } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'

import { MainApi, useMainApi } from '../../apis'
import { useGlobalShare } from '@/stores'

export default defineComponent({
  name: 'JoinSelectPage',
  components: {
    IonPage,
    IonContent,
    IonIcon
  },
  setup(props) {
    const globalState = useGlobalShare();
    const router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = useMainApi();

    const loginedMemberIdRef = ref<HTMLInputElement>();

    function deletePd(){

      const loginedMemberId = loginedMemberIdRef.value;

      if( loginedMemberId == null ){
        return;
      }

      mainApi.pd_doDelete( loginedMemberId.value )
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }

          localStorage.removeItem("authKey");
          localStorage.removeItem("loginedMemberId");
          localStorage.removeItem("loginedMemberName");
          localStorage.removeItem("loginedMemberEmail");
          localStorage.removeItem("loginedMemberCellPhoneNo");
          localStorage.removeItem("loginedMemberAddress");
          localStorage.removeItem("loginedMemberJobPosition");
          localStorage.removeItem("loginedMemberCorpName");
          localStorage.removeItem("loginedMemberCorpType");

          globalState.loginedMember = {
            authKey:null,
            id:null,
            name:null,
            address:null,
            email:null,
            cellPhoneNo:null,
            jobPosition:null,
            corpName:null,
            corpType:null,
            profileImgUrl:null
          };

          router.replace('/');
    });

    }

    function logout(){
          localStorage.removeItem("authKey");
          localStorage.removeItem("loginedMemberId");
          localStorage.removeItem("loginedMemberName");
          localStorage.removeItem("loginedMemberEmail");
          localStorage.removeItem("loginedMemberCellPhoneNo");
          localStorage.removeItem("loginedMemberAddress");
          localStorage.removeItem("loginedMemberJobPosition");
          localStorage.removeItem("loginedMemberCorpName");
          localStorage.removeItem("loginedMemberCorpType");  
          localStorage.removeItem("loginedMemberProfileImgUrl");

          globalState.loginedMember = {
            authKey:null,
            id:null,
            name:null,
            address:null,
            email:null,
            cellPhoneNo:null,
            jobPosition:null,
            corpName:null,
            corpType:null,
            profileImgUrl:null
          };
          router.replace('/');
    }

    function hisback() {
      router.back();
    }


      async function presentAlertConfirm(event:Event) {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: '회원을 탈퇴하시겠습니까?',
          message: '탈퇴한 회원을 복구할 수 없습니다.',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
              },
            },
            {
              text: 'Okay',
              handler: () => {
                deletePd();
              },
            },
          ],
        });
      return alert.present();
    }
   
   return {
     deletePd,
     loginedMemberIdRef,
     returnUpBackOutline,
     hisback,
     logout,
     presentAlertConfirm,
     globalState
   }
  }
})
</script>

<style scoped>
.btn-modify {
  padding:0 3px;
  border-radius: 6px;
}
</style>