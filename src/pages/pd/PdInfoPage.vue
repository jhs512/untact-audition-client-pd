<template>
<ion-page>
  <ion-content :fullscreen="true">
    <IonRefresherC></IonRefresherC>
  <div class="flex flex-col min-h-screen mb-20">

    <TitleBar title="Audictionary" btn_back="true"></TitleBar>

    <div class="flex flex-col container mx-auto border-t border-b py-2">
      <div class="flex flex-col mx-auto text-center">
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

    <ion-segment v-model="segment.value" mode="md" color="dark" @ionChange="changeSegmentValue($event)">
      <ion-segment-button value="profile" class="font-roboto font-bold">profile</ion-segment-button>
      <ion-segment-button value="filmgraphy" class="font-roboto font-bold">filmgraphy</ion-segment-button>
    </ion-segment>

    <div v-if="segment.value == `profile`" class="flex flex-col ml-3 mt-6">
      <span class="font-roboto font-bold mt-1">Name.  {{globalState.loginedMember.name}}</span>
      <span class="font-roboto font-bold mt-1">Email.  {{globalState.loginedMember.email}}</span>
      <span class="font-roboto font-bold mt-1">Address. {{globalState.loginedMember.address}}</span>      
    </div>
    <div v-if="segment.value == `filmgraphy`">
      11111111111
      </div>
  </div>

  </ion-content>
  
</ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { IonPage, IonContent, IonIcon, IonSegment, IonSegmentButton, alertController } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import { useGlobalShare } from '@/stores'
import { useMainService } from '@/services'

export default defineComponent({
  name: 'JoinSelectPage',
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonSegment,
    IonSegmentButton
  },
  setup(props) {
    const globalState = useGlobalShare();
    const mainApiService = useMainService();

    const loginedMemberIdRef = ref<HTMLInputElement>();

    const segment = reactive({
      value:'profile'
    })

    function changeSegmentValue(event:any){
      segment.value = event.target.value;
    }

    function deletePd(){

      const loginedMemberId = loginedMemberIdRef.value;

      if( loginedMemberId == null ){
        return;
      }

      mainApiService.pd_doDelete( loginedMemberId.value )
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }

          globalState.logout();
          
          location.replace('/');
    });

    }

      async function presentAlertConfirm(event:Event) {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: '회원을 탈퇴하시겠습니까?',
          message: '탈퇴한 회원을 복구할 수 없습니다.',
          buttons: [
            {
              text: '취소',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
              },
            },
            {
              text: '탈퇴',
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
     presentAlertConfirm,
     segment,
     globalState,
     changeSegmentValue
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