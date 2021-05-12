<template>
<ion-page>
    <ion-content :fullscreen="true">

      <IonRefresherC></IonRefresherC>
      
      <div class="flex flex-col min-h-screen mb-20">
        <TitleBar title="Audictionary" btn_back="true"></TitleBar>

        <div class="flex mx-4">
          <span class="bg-underline p-2">ARTIST INFO</span>
        </div>

        <div class="flex flex-col mx-4 mt-8 p-2">
          <span>NAME</span>
          <div class="flex justify-center items-center">
            <span class="flex-1 text-center">{{state.ap.name}}</span>
            <div class="flex-1" v-if="state.application.extra != null">
              <img :src="state.application.extra.file__photo__attachment.forPrintUrl" alt="">
            </div>
          </div>  
          <span class="ml-auto">GENDER. {{state.ap.gender}}</span>
        </div>

        <div class="flex flex-col mx-4 mt-8 p-2">
          <span>생년월일. {{state.ap.regNumber}}</span>
          <span>몸무게. {{state.ap.weight}}</span>
          <span>키. {{state.ap.feet}}</span>
        </div>

        <div class="flex flex-col mx-4 mt-8 p-2">
          <span>특기. {{state.ap.feature}}</span>
          <span>출연작. {{state.ap.filmgraphy}}</span>
        </div>

        <div class="flex flex-col mx-4 mt-8 p-2">
          <span>1차 오디션 연기영상</span>
          <div v-if="state.application.extra != null">
            <video controls :src="state.application.extra.file__video__attachment.forPrintUrl"></video>
          </div>
        </div>

        <div class="flex justify-around mt-10">
          <ion-button @click="fail(state.application)" color="medium">탈락하기</ion-button>
          <ion-button fill="outline" @click="like(state.application)" color="danger">LIKE</ion-button>
          <ion-button @click="select(state.application)" color="danger">1차 통과</ion-button>
        </div>

      </div>

    </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { IonContent, IonPage, IonSlide, IonSlides, IonButton } from '@ionic/vue';
import { useGlobalShare } from '@/stores';
import { useMainService } from '@/services';
import { IAp } from '@/types';
import * as Util from '@/utils'

export default defineComponent({
  name: 'ApplicationgDetailPage',
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

    const state = reactive({
      application:[] as any,
      ap: {} as IAp
    });

    function loadData(){
      mainService.application_detail(props.id)
      .then(axiosResponse => {
        state.application = axiosResponse.data.body.application;
        state.ap = axiosResponse.data.body.ap;
        state.ap.regNumber = state.ap.regNumber.substring(0,6);
      })
    }
    
    function select(application: any){
      mainService.application_select(application.id)
      .then(axiosResponse => {

      });
    }

    function fail(application: any){
      mainService.application_fail(application.id)
      .then(axiosResponse => {

      })
    }

    function like(application: any){
      mainService.application_like(application.id, globalState.loginedMember.id)
      .then(axiosResponse => {
        
      })
    }

    onMounted(() => {
      if(globalState.isLogined == false){
        Util.showAlert("알림", "로그인 후 이용해주세요.", location.replace('/'));
      }
      loadData();
    });

    return {
      select,
      fail,
      like,
      state
    }
  }
})
</script>

<style scoped>

</style>