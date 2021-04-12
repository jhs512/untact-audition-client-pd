<template>
  <ion-page>
    <ion-content>
     <img :src="state.applications.extra.file__common__attachment[1].forPrintUrl" alt="">
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { IonContent, IonPage } from '@ionic/vue';
import { useMainService } from '@/services';
import { IApplication } from '@/types';
export default defineComponent({
  name: 'ApplicationgListPage',
  components:{
    IonContent,
    IonPage
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
      applications:[] as IApplication[]
    })

    onMounted(() => {
      
    })
loadApplicationList();
    function loadApplicationList(){
      mainService.application_list(props.id)
    .then(axiosResponse => {
      state.applications = axiosResponse.data.body.applications;
    })
    }
    

    return {
      state
    }
  }
})
</script>

<style scoped>
</style>