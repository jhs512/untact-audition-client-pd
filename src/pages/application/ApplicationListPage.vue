<template>
<ion-page>
    <ion-content :fullscreen="true">
       <ion-slides :options="slideOpts" class="min-h-screen mb-20">
         <!--
         <ion-slide v-bind:key="application" v-for="application in state.list">
           <div class="flex flex-col">
            <div class="w-72 h-72">
           <img :src="application.extra.file__common__attachment[1].forPrintUrl" alt="">
            </div>
            <div class="w-72 h-72">
           <img :src="application.extra.file__common__attachment[2].forPrintUrl" alt="">
            </div>
            <div class="w-72 h-72">
           <video controls :src="application.extra.file__common__attachment[3].forPrintUrl"></video>
            </div>
           </div>
        </ion-slide>
        -->
      </ion-slides>
    </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { IonContent, IonPage, IonSlide, IonSlides } from '@ionic/vue';
import { useMainService } from '@/services';



export default defineComponent({
  name: 'ApplicationgListPage',
  components:{
    IonContent,
    IonPage,
    IonSlide, 
    IonSlides
  },
  props:{
    id:{
      type: Number,
      required: true
    }
  },
  setup(props){
    
    const mainService = useMainService();

    const state = reactive({
      list: [] as any[]
    })
 
    setTimeout(() => {
      
      
    }, 1000);
     
    const slideOpts = {
      initialSlide: 1,
      speed: 400
    };

    onMounted(() => {
     loadApplicationList();
    })

    function loadApplicationList(){
      mainService.application_list(props.id)
    .then(axiosResponse => {
      
    // state.list = axiosResponse.data.body.applications;

    for(var i = 0 ; i <  axiosResponse.data.body.applications.length; i++){
          const s = document.createElement('ion-slide');  
          s.innerHTML = `<ion-slide>
           <div class="flex flex-col">
            <div class="w-72 h-72">
           <img src="${axiosResponse.data.body.applications[i].extra.file__common__attachment[1].forPrintUrl}" alt="">
            </div>
            <div class="w-72 h-72">
           <img src="${axiosResponse.data.body.applications[i].extra.file__common__attachment[2].forPrintUrl}" alt="">
            </div>
            <div class="w-72 h-72">
           <video controls src="${axiosResponse.data.body.applications[i].extra.file__common__attachment[3].forPrintUrl}"></video>
            </div>
           </div>
        </ion-slide>`;
          document.querySelector('.swiper-wrapper')?.appendChild(s);
    }

     
    })
    }
    

    return {
      state,
      slideOpts,
    }
  }
})
</script>

<style scoped>

    ion-slides {
      height: 100%;
    }

</style>