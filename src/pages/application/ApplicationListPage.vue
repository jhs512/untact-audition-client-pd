<template>
<ion-page>
    <ion-content :fullscreen="true">
      <IonRefresherC></IonRefresherC>
      <TitleBar title="Audictionary" btn_back="true" class="border-b"></TitleBar>    
      <ion-slides :options="slideOpts" class="min-h-height mb-20 mt-4">
        <ion-slide v-bind:key="application" v-for="application,index in list">
          <div class="flex flex-col">
            <span class="block py-4 border-b-4">{{index+1}}. {{application.extra__ap_name}}</span>

            <div class="mt-8 border-b-4">
            <span>현재 사진</span>
            <div v-if="application.extra != null && application.extra.file__photo__attachment != null" class="my-10">
              <div class="w-72 h-72 flex flex-col justify-center items-center">
                <img :src="application.extra.file__photo__attachment[1].forPrintUrl" alt="" class="mx-auto">
              </div>
            </div>
          </div>

            <div class="mt-8 border-b-4">
              <span>프로필 사진</span>
              <div v-if="application.extra != null && application.extra.file__profile__attachment != null" class="my-10 flex justify-center items-center">
                <div class="w-72 h-72" v-bind:key="profile" v-for="profile in application.extra.file__profile__attachment">
                  <img :src="profile.forPrintUrl" alt="" class="mx-auto">
                </div>
              </div>
            </div>
          
          <div class="mt-8 border-b-4">
            <span>연기 영상</span>
            <div v-if="application.extra != null && application.extra.file__video__attachment != null" class="my-10">
              <div class="w-72 h-72 flex flex-col justify-center items-center" >
                <video controls :src="application.extra.file__video__attachment[1].forPrintUrl" class="mx-auto"></video>
              </div>
            </div>
          </div>

          <div class="flex flex-col mt-8">
            <div class="ml-auto">
              <ion-button :router-link="`/usr/application/detail?id=${application.id}`" fill="outline" color="dark">지원서 보기</ion-button>
            </div>
            <div class="flex justify-between mt-4">
              <ion-button @click="fail(application)" color="medium">탈락하기</ion-button>
              <div class="flex-1"></div>
              <ion-button :fill="application.extra.isLiked" @click="like(application, $event)" color="danger">LIKE</ion-button>
              <ion-button @click="select(application)" color="danger">1차 통과</ion-button>
            </div>
          </div>
          </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { IonContent, IonPage, IonSlide, IonSlides, IonButton, alertController } from '@ionic/vue';
import { applicationList, useGlobalShare } from '@/stores';
import { mainServiceSymbol, useMainService } from '@/services';

import * as Util from '@/utils'

export default defineComponent({
  name: 'ApplicationgListPage',
  components:{
    IonContent,
    IonPage,
    IonSlide, 
    IonSlides,
    IonButton
  },
  props:{
    id:{
      type: Number,
      required: true
    }
  },
  setup(props){

    const globalState = useGlobalShare();
    const mainService = useMainService();

    // 페이지가 불러와지면 로그인 여부 체크
    onMounted(() => {
      if(globalState.isLogined == false){
        Util.showAlert("알림", "로그인 후 이용해주세요.", () => location.replace('/'));
        return;
      }
    })
    
    // ion-slide 버그로 페이지가 불러오기 전에 router.beforeEach 에서 미리 applicationList 정보를 받아옴
    // 미리 받아온 applicationList를 변수로 선언
    const list = applicationList.list;
    
    // ion-slide 옵션 (첫 슬라이드 위치와 속도를 설정합니다.)
    const slideOpts = {
      initialSlide: 0,
      speed: 400
    };

    async function select(application: any){
       const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: '1차 합격',
          message: '1차 합격 하시겠습니까?',
          buttons: [
            {
              text: '취소',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
              },
            },
            {
              text: '합격',
              handler: () => {
                doSelect(application);
              },
            },
          ],
        });
      return alert.present();
    }

      function doSelect(application:any ){
        mainService.application_select(application.id)
       .then(axiosResponse => {
         if(axiosResponse.data.fail){
           Util.showAlert("알림", "오류가 발생했습니다.", null);
           return;
         }
         Util.showAlert("알림", "1차 합격자로 선정되었습니다.", null);
      });
    }
    

    async function fail(application: any){
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: '불합격',
          message: '불합격 하시겠습니까?',
          buttons: [
            {
              text: '취소',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
              },
            },
            {
              text: '불합격',
              handler: () => {
                doFail(application);
              },
            },
          ],
        });
      return alert.present();
    }

    function doFail(application:any){
      mainService.application_fail(application.id)
      .then(axiosResponse => {
        if(axiosResponse.data.fail){
           Util.showAlert("알림", "오류가 발생했습니다.", null);
           return;
         }
         Util.showAlert("알림", "지원자를 불합격 했습니다.", null);
      })
    }


    function like(application: any, event:any){
      mainService.application_like(application.id, globalState.loginedMember.id)
      .then(axiosResponse => {
         if (axiosResponse.data.body.isLike == true){
          event.target.setAttribute("fill","solid");  
        } 
        else if (axiosResponse.data.body.isLike == false){
          event.target.setAttribute("fill","outline");  
        }
      })
    }

    return {
      list,
      slideOpts,
      select,
      fail,
      like
    }
  }
})
</script>

<style scoped>

</style>