<template>
<ion-page>
    <ion-content :fullscreen="true">
       <ion-slides :options="slideOpts" class="min-h-height mb-20">
         <ion-slide v-bind:key="application" v-for="application in list">
           <div class="flex flex-col">
            <div class="w-72 h-72 mt-4 flex justify-center items-center">
              <img :src="application.extra.file__common__attachment[1].forPrintUrl" alt="" class="mt-auto">
            </div>
            <div class="w-72 h-72 mt-4 flex justify-center items-center">
              <img :src="application.extra.file__common__attachment[2].forPrintUrl" alt="">
            </div>
            <div class="w-72 h-72 mt-4 flex justify-center items-center">
              <video controls :src="application.extra.file__common__attachment[3].forPrintUrl"></video>
            </div>
            <div class="mt-4">
              <ion-button @click="select(application)">asd</ion-button>
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
import { applicationList } from '@/stores';
import { useMainService } from '@/services';



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

    const mainService = useMainService();
    
    const list = applicationList.list;
    
    const slideOpts = {
      initialSlide: 0,
      speed: 400
    };

    function select(application:any){
      mainService.ap_select(application.id, application.memberId)
      .then(axiosResponse => {

      });
    }

    return {
      list,
      slideOpts,
      select
    }
  }
})
</script>

<style scoped>

</style>