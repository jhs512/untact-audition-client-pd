<template>
<ion-page>
  <ion-content :fullscreen="true">
    <TitleBar title="Audictionary" btn_back="true"></TitleBar>
   <ion-searchbar debounce="1000" @ionChange="searchKeyword($event)"></ion-searchbar>

   
    <router-link :to="`/usr/recruit/detail?id=${recruit.id}`" v-bind:key="recruit" v-for="recruit in state.recruits">
    <ion-card class="text-white py-4 mb-2 mt-0">
     <ion-card-header class="text-center">
       <ion-card-title>가제 : {{recruit.title}}</ion-card-title>
       <ion-card-subtitle>감독 : {{recruit.extra__aw_director}}</ion-card-subtitle>
       <ion-card-subtitle v-if="recruit.dateDiff > 0">기한 : {{recruit.dateDiff}}일</ion-card-subtitle>
       <ion-card-subtitle v-if="recruit.dateDiff == 0">기한 : 오늘까지</ion-card-subtitle>
       <ion-card-subtitle v-if="recruit.dateDiff < 0">기한 마감</ion-card-subtitle>
     </ion-card-header>

      <ion-thumbnail v-if="recruit.extra != null" class="w-60 h-60 mx-auto">  
      <ion-img :src="recruit.extra.file__common__attachment[1].forPrintUrl" alt="" class="object-contain mx-auto"></ion-img>
      </ion-thumbnail>

      <ion-thumbnail v-if="recruit.extra == null" class="w-60 h-60 mx-auto">  
      <ion-img src="/gen/Avatar.jpeg" alt="Avatar" class="object-contain mx-auto"></ion-img>
      </ion-thumbnail>

      <ion-card-header class="text-center">
        
        <ion-card-subtitle>배역이름 : {{recruit.extra__ar_name}}</ion-card-subtitle>
        <ion-card-subtitle>배역설명 : {{recruit.extra__ar_character}}</ion-card-subtitle>
      </ion-card-header>
    </ion-card>
    </router-link>
   

  </ion-content>
</ion-page>

</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import { IonContent, IonPage, IonSearchbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonThumbnail, IonImg } from '@ionic/vue';
import { useMainService } from '@/services';
import { IActingRole, IArtwork, IRecruit } from '@/types';


export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonSearchbar,
    IonCard, 
    IonCardContent,
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle,
    IonThumbnail, 
    IonImg
    },
  name: 'SearchPage',
  props:{
  },
  setup(props) {

    const mainService = useMainService();

    const state = reactive({
      recruits:[] as any[]
    })

    function searchKeyword(event: any){
      if( event.target.value.length > 0 ){

      mainService.recruitByKeyword(event?.target.value)
      .then(axiosResponse => {
        

        state.recruits = axiosResponse.data.body.recruits;

        for(let i = 0 ; i < state.recruits.length ; i++ ){
        const today = new Date();
        const regDate = new Date(state.recruits[i].deadline);

        state.recruits[i].dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
        
        }
      })
      }

    }
    
    
    return {
      searchKeyword,
      state
    }
  }
})

</script>

<style scoped>

</style>