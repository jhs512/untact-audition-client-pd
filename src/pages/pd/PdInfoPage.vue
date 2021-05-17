<template>
<ion-page>
  <ion-content :fullscreen="true">
    <IonRefresherC></IonRefresherC>
    <div class="flex flex-col min-h-screen mb-20">

      <TitleBar title="Audictionary" btn_back="true" btn_menu="true"></TitleBar>

      <div class="flex flex-col container mx-auto border-b py-2">
        <div class="flex flex-col mx-auto text-center">

          <div v-if="globalState.loginedMember.extra__thumbImg != null" class="img-container mx-4 mb-4 p-4 mt-6">  
            <img :src="globalState.loginedMember.extra__thumbImg" class="mx-auto w-60 h-60 object-cover rounded-full">
            <ion-button size="small" color="dark" fill="outline" v-if="globalState.loginedMember.loginedMemberType != `kakao`" :onclick="deleteProfileImg" class="mt-4">프로필 이미지 삭제</ion-button>
          </div>

          <div v-if="globalState.loginedMember.extra__thumbImg == null" class="img-container mx-4 mb-4 p-4 mt-6">  
            <img src="https://backend.audictionary.com/gen/common/thumbnail_alt.png" class="mx-auto w-60 h-60 object-contain">
          </div>

          <div>
            <span class="text-3xl">{{state.pd.name}}</span>
          </div>
          <!-- 임시 
          <span class="btn-modify border-2 w-24 mx-auto mt-2 border-black text-xs"><router-link class="w-full block" :to="`/usr/pd/modify?id=${globalState.loginedMember.id}`">프로필 편집</router-link></span>
          -->
          <div  class="mt-2">
            <form v-if="globalState.loginedMember.loginedMemberType != `kakao`" class="my-2" action="" >
              <input type="button" value="회원탈퇴" v-on:click="presentAlertConfirm($event)" class="px-2 text-sm">
            </form>
            <!-- 임시
            <div class="my-2">
              <span v-on:click="logout">로그아웃</span>
            </div>
            -->
          </div>

        </div>
      </div>

      <ion-segment v-model="segment.value" mode="md" color="dark" @ionChange="changeSegmentValue($event)">
        <ion-segment-button value="profile" class="font-roboto font-bold">profile</ion-segment-button>
        <ion-segment-button value="like" class="font-roboto font-bold">like</ion-segment-button>
      </ion-segment>

      <div v-if="segment.value == `profile` && state.artworks.length > 0" class="container mx-auto">
        <ion-item-sliding class="mt-4"  v-bind:key="artwork" v-for="artwork in state.artworks">
          <ion-item lines="none" class="">
            <ion-card class="w-full">
              <img :src="artwork.image" class="mx-auto mt-8">
                <ion-card-header>
                  <ion-card-title class="text-center">
                    {{artwork.title}}
                  </ion-card-title>
                  <ion-card-subtitle class="text-center">
                    {{artwork.subtitle}}
                  </ion-card-subtitle>
                </ion-card-header>
                <div class="flex justify-end">
                  <span class="mr-4">
                  ← 왼쪽으로 밀어서 제거
                  </span>
                </div>
            </ion-card>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="dark" @click="deleteFilmgraphy(artwork)" class="my-6">제거</ion-item-option>
          </ion-item-options> 
        </ion-item-sliding>
      </div>

      <div v-if="segment.value == `like`" class="flex flex-col ml-8 mr-4 mt-6 conatiner">
        <div class="mt-4">
          <ion-item-sliding class="flex mt-4" v-bind:key="ap" v-for="ap in state.likeApList">
            <ion-item lines="none" class="w-full">
              <div class="w-20 h-20 rounded-full" v-if="ap.extra != null && ap.extra.file__profile__attachment != null">
                <img class="w-full h-full object-cover rounded-full" :src="ap.extra.file__profile__attachment[1].forPrintUrl" alt="">
              </div>
              <div class="flex flex-col ml-4">
                <span class="font-bold">{{ap.extra__ap_name}}</span>
                <span>지원 작품: {{ap.extra__aw_title}}</span>
                <span>배역: {{ap.extra__ar_name}}</span>
              </div>
            </ion-item>
            <ion-item-options side="end">
              <ion-item-option color="dark" @click="deleteLikeApplication(ap)">제거</ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </div>
      </div>
    </div>

  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { IonPage, IonContent, IonIcon, IonSegment, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonButton, IonSegmentButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonThumbnail, IonImg, IonAvatar, alertController } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import { pdFilmgraphy, useGlobalShare } from '@/stores'
import { useMainService } from '@/services'
import { IAp,  IPd } from '@/types'
import * as Util from '@/utils'

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
      if(globalState.isLogined == false){
        Util.showAlert("알림", "로그인 후 이용해주세요.", location.replace('/'));
      }
      loadData();
    })

    function loadData(){
      mainApiService.pd_showDetail(props.id)
      .then(axiosResponse => {
        state.pd = axiosResponse.data.body.pd;
        state.likeApList = axiosResponse.data.body.aps;
      })

      mainApiService.pd_getArtwork(props.id)
      .then(axiosResponse => {
        if( !axiosResponse.data.fail ){
          state.artworks = axiosResponse.data.body.artworks;
          pdFilmgraphy.movieList = axiosResponse.data.body.artworks;
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

    function changeSegmentValue(event: any){
      segment.value = event.target.value;
    }

    function deletePd(){
      mainApiService.pd_doDelete( globalState.loginedMember.id, globalState.loginedMember.loginedMemberType )
        .then(axiosResponse => {
          
          if ( axiosResponse.data.fail ) {
            Util.showAlert("알림", axiosResponse.data.msg , null);
            return;
          }
          globalState.logout();
      });
    }

    function logout(){
      mainApiService.pd_doLogout()
      .then(axiosResponse => {
        globalState.logout();
      })
    }

    async function presentAlertConfirm(event: Event) {
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

  async function deleteProfileImg(){
    const alert = await alertController
      .create({
        cssClass: 'my-custom-class',
        header: '프로필 이미지 삭제',
        message: '프로필 이미지를 삭제하시겠습니까?',
        buttons: [
          {
            text: '취소',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            },
          },
          {
            text: '삭제',
            handler: () => {
              doDeleteProfileImg();
            },
          },
        ],
      });
    return alert.present();
  }

    function doDeleteProfileImg(){
      mainApiService.pd_deleteProfileImg(props.id)
      .then(axiosReponse => {
        state.pd.extra__thumbImg = '';
        localStorage.removeItem("loginedMemberExtra__thumbImg");
        globalState.loginedMember.extra__thumbImg = null;
      });
    }
    

    function deleteLikeApplication(ap: any){
      mainApiService.application_cancelLike(props.id, ap.id, ap.memberId)
      .then(axiosResponse =>{
        state.likeApList = axiosResponse.data.body.applications;
      });
    }

    function deleteFilmgraphy(artwork:any){
      mainApiService.pd_deleteArtwork(artwork.id)
      .then(aixosResponse => {
        if(aixosResponse.data.success){
          for(var i = 0 ; i < state.artworks.length ; i++){
            if(state.artworks[i].id == artwork.id){
              state.artworks.splice(i,1);
            }
          }
        }
      });
    }
   
   return {
     state,
     deletePd,
     logout,
     returnUpBackOutline,
     presentAlertConfirm,
     segment,
     globalState,
     deleteProfileImg,
     changeSegmentValue,
     deleteLikeApplication,
     deleteFilmgraphy
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