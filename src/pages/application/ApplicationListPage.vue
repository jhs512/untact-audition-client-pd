<template>
<ion-page>
    <ion-content :fullscreen="true">
       <ion-slides :options="slideOpts" class="min-h-height mb-20 mt-4">
         <ion-slide v-bind:key="application" v-for="application,index in list">
           <div class="flex flex-col">
             <span>{{index+1}}. {{application.extra__ap_name}}</span>
             <span class="mt-8">현재 사진</span>
            <div class="w-72 h-72 flex flex-col justify-center items-center">
              <img :src="application.extra.file__common__attachment[1].forPrintUrl" alt="">
            </div>
            <span class="mt-8">프로필 사진</span>
            <div class="w-72 h-72 flex flex-col justify-center items-center">
              <img :src="application.extra.file__common__attachment[2].forPrintUrl" alt="">
            </div>
            <span class="mt-8">연기 영상</span>
            <div class="w-72 h-72 flex flex-col justify-center items-center">
              <video controls :src="application.extra.file__common__attachment[3].forPrintUrl"></video>
            </div>
            <div class="flex justify-between mt-8">
              <ion-button @click="fail(application)" color="medium">탈락하기</ion-button>
              <div class="flex-1"></div>
              <ion-button fill="outline" @click="like(application)" color="danger">LIKE</ion-button>
              <ion-button @click="select(application)" color="danger">1차 통과</ion-button>
            </div>
           </div>
        </ion-slide>
      </ion-slides>
    </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage, IonSlide, IonSlides, IonButton } from '@ionic/vue';
import { applicationList, useGlobalShare } from '@/stores';
import { mainServiceSymbol, useMainService } from '@/services';



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
    
    const list = applicationList.list;
    
    const slideOpts = {
      initialSlide: 0,
      speed: 400
    };

    function select(application:any){
      mainService.application_select(application.id)
      .then(axiosResponse => {

      });
    }

    function fail(application:any){
      mainService.application_fail(application.id)
      .then(axiosResponse => {

      })
    }

    function like(application:any){
      mainService.application_like(application.id, globalState.loginedMember.id)
      .then(axiosResponse => {
        
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