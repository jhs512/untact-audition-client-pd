<template>
<ion-page>
  <ion-content :fullscreen="true">
    <IonRefresherC></IonRefresherC>
  <div class="flex flex-col min-h-screen mb-20">

    <TitleBar title="Audictionary" btn_back="true"></TitleBar>

    <div class="flex flex-col container mx-auto border-t border-b py-2">
      <div class="flex flex-col mx-auto text-center">
      <div v-if="state.pd.extra__thumbImg != null" class="img-container mx-4 mb-4 p-4 mt-6">  
        <img :src="state.pd.extra__thumbImg" class="mx-auto w-60 h-60 object-contain">
        <ion-button :onclick="deleteProfileImg">프로필 이미지 삭제</ion-button>
      </div>

       <div v-if="globalState.loginedMember.extra__thumbImg != null" class="img-container mx-4 mb-4 p-4 mt-6">  
        <img :src="globalState.loginedMember.extra__thumbImg" class="mx-auto w-60 h-60 object-contain">
      </div>
      
        <span v-if="globalState.loginedMember.loginedMemberType == 'pd'" class="btn-modify border-2 w-24 mx-auto mt-2 border-black text-xs"><router-link class="w-full block" to="/usr/pd/modify">프로필 편집</router-link></span>

        <div  class="mt-2">
          <form v-if="globalState.loginedMember.loginedMemberType == 'pd'" class="my-2" action="" >
            <input type="button" value="회원탈퇴" v-on:click="presentAlertConfirm($event)">
          </form>
          <div class="my-2">
            <span v-on:click="globalState.logout">로그아웃</span>
          </div>
        </div>

      </div>
    </div>

    <ion-segment v-model="segment.value" mode="md" color="dark" @ionChange="changeSegmentValue($event)">
      <ion-segment-button value="profile" class="font-roboto font-bold">profile</ion-segment-button>
      <ion-segment-button value="like" class="font-roboto font-bold">like</ion-segment-button>
    </ion-segment>

    <div v-if="segment.value == `profile` && state.artworks.length > 0">
      <ion-card v-bind:key="artwork" v-for="artwork in state.artworks">
        <img :src="artwork.image" class="mx-auto mt-8">
               <ion-card-header>
                <ion-card-title class="text-center">
                  {{artwork.title}}
                </ion-card-title>
                <ion-card-subtitle class="text-center">
                  {{artwork.subtitle}}
                </ion-card-subtitle>
               </ion-card-header>
      </ion-card>
      </div>

    <div v-if="segment.value == `like`" class="flex flex-col mx-4 mt-6">
         <div class="">
           <ion-item-sliding class="flex" v-bind:key="ap" v-for="ap in state.likeApList">
             <ion-item lines="none" class="w-full">
             <div class="w-20 h-16" v-if="ap.extra != null && ap.extra.file__profile__attachment != null">
               <img class="w-20 h-16 object-cover rounded-3xl" :src="ap.extra.file__profile__attachment[1].forPrintUrl" alt="">
             </div>
             <div class="flex flex-col ml-4">
               <span>{{ap.extra__ap_name}}</span>
               <span>지원 작품: {{ap.extra__aw_title}}</span>
               <span>배역: {{ap.extra__ar_name}}</span>
             </div>
             </ion-item>
             <ion-item-options side="end">
                <ion-item-option @click="deleteLikeApplication(ap)">제거</ion-item-option>
             </ion-item-options>
           </ion-item-sliding>
         </div>
    </div>
  </div>

  </ion-content>
  
</ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { IonPage, IonContent, IonIcon, IonSegment, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonButton, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonThumbnail, IonImg, IonAvatar, alertController } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import { useGlobalShare } from '@/stores'
import { MainService, useMainService } from '@/services'
import { IAp, IArtwork, IPd } from '@/types'
import axios from 'axios'

export default defineComponent({
  name: 'JoinSelectPage',
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonButton,
    IonItemSliding,
    IonItem, 
    IonItemOption, 
    IonItemOptions,
    IonSegment,
    IonSegmentButton,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle,
    IonThumbnail, 
    IonImg, 
    IonAvatar 
  },
  props:{
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const globalState = useGlobalShare();
    const mainApiService = useMainService();

    
    onMounted(() => {
      if(globalState.loginedMember.loginedMemberType == 'pd'){
        loadData();
      }
    })

    function loadData(){
      mainApiService.pd_showDetail(props.id)
      .then(axiosResponse => {
        state.pd = axiosResponse.data.body.pd;
        state.likeApList = axiosResponse.data.body.aps;
      })


      mainApiService.pd_getArtwork(props.id)
      .then(axiosResponse => {
        if( !!!axiosResponse.data.fail ){
          state.artworks = axiosResponse.data.body.artworks
        }
        
      })
    }

    const state = reactive({
      pd: {} as IPd,
      artworks: [] as any,
      likeApList:[] as IAp[]
    })
    

    const segment = reactive({
      value:'profile'
    })

    function changeSegmentValue(event:any){
      segment.value = event.target.value;
    }

    function deletePd(){

      mainApiService.pd_doDelete( globalState.loginedMember.id )
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

    function deleteProfileImg(){
      mainApiService.pd_deleteProfileImg(props.id)
      .then(axiosReponse => {
        state.pd.extra__thumbImg = '';
      });
    }

    function deleteLikeApplication(ap:any){
      
      mainApiService.application_cancelLike(props.id, ap.id, ap.memberId)
      .then(axiosResponse =>{
        state.likeApList = axiosResponse.data.body.applications;
      });
    }
   
   return {
     state,
     deletePd,
     returnUpBackOutline,
     presentAlertConfirm,
     segment,
     globalState,
     deleteProfileImg,
     changeSegmentValue,
     deleteLikeApplication
   }
  }
})
</script>

<style scoped>
.btn-modify {
  padding:0 3px;
  border-radius: 6px;
}
ion-card {
  border-radius:25px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
  border:2px solid #DADADA;
}
</style>