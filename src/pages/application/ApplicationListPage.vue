<template>
    <ion-content fullscreen class="ion-padding" scroll-y="false">
       <ion-slides pager="true" :options="slideOpts">
         <ion-slide v-bind:key="application.id" v-for="application in state.applications">
           {{application}}
        </ion-slide>
      </ion-slides>
    </ion-content>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { IonContent, IonPage, IonSlide, IonSlides } from '@ionic/vue';
import { useMainService } from '@/services';
import { IApplication } from '@/types';
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
      applications:[] as any
    })

     
    const slideOpts = {
      initialSlide: 0,
      speed: 400
    };

    onMounted(() => {
      loadApplicationList();      
      
    })

    function loadApplicationList(){
      mainService.application_list(props.id)
    .then(axiosResponse => {
      state.applications = axiosResponse.data.body.applications;
    })
    }
    

    return {
      state,
      slideOpts
    }
  }
})
</script>

<style scoped>

    ion-slides {
      height: 100%;
    }

</style>