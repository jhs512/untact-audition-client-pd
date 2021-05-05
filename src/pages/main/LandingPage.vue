<template>
<ion-page>
  <ion-content :fullscreen="true">
    
  <IonRefresherC></IonRefresherC>

    <div class="flex flex-col min-h-screen">
    
    <TitleBar title="Audictionary" btn_menu="true" class="border-b"></TitleBar>    

    <div class="ml-8 font-bold mb-4">
      <span class="subtitle">방금 올라온 공고</span>
    </div>

   <router-link :to="`/usr/recruit/detail?id=${recruit.id}`" v-bind:key="recruit" v-for="recruit in state.list">
    <ion-card class="text-white py-4 mb-2 mt-0">
     <ion-card-header class="text-center">
       <ion-card-title>가제 : {{recruit.extra__aw_title}}</ion-card-title>
       <ion-card-subtitle>감독 : {{recruit.extra__aw_director}}</ion-card-subtitle>
       <ion-card-subtitle v-if="recruit.dateDiff > 0">기한 : {{recruit.dateDiff}}일</ion-card-subtitle>
       <ion-card-subtitle v-if="recruit.dateDiff == 0">기한 : 오늘까지</ion-card-subtitle>
       <ion-card-subtitle v-if="recruit.dateDiff < 0">기한 마감</ion-card-subtitle>
     </ion-card-header>

      <div v-if="recruit.extra != null" class="w-60 h-60 mx-auto">  
      <img :src="recruit.extra.file__common__attachment[1].forPrintUrl" alt="" class="w-60 h-60 object-contain mx-auto">
      </div>

    <div v-if="recruit.extra == null" class="w-60 h-60 mx-auto">  
      <img src="/gen/Avatar.jpeg" alt="Avatar" class="w-60 h-60 object-contain mx-auto">
      </div>

      <ion-card-header class="text-center">
        <ion-card-subtitle>배역이름 : {{recruit.extra__ar_name}}</ion-card-subtitle>
        <ion-card-subtitle>배역설명 : {{recruit.extra__ar_character}}</ion-card-subtitle>
      </ion-card-header>
    </ion-card>
    </router-link>

    <div class="ml-8 font-bold mb-1 mt-8">
      <span class="subtitle">많이 물어본 질문</span>
    </div>

    <ion-card class="mt-2 mb-2 py-4">
      <ion-card-header>
        <ion-card-title class="text-lg text-center">캐스팅은 어떻게 진행되나요?</ion-card-title>
        <ion-card-title class="text-right text-base flex justify-end items-center"><span>알아보기<ion-icon :icon="arrowForwardOutline"></ion-icon></span></ion-card-title>
      </ion-card-header>
    </ion-card>

    <ion-card class="mt-2 py-4">
      <ion-card-header>
        <ion-card-title class="text-lg text-center">익명성 보장이 되나요?</ion-card-title>
        <ion-card-title class="text-right text-base flex justify-end items-center"><span>알아보기<ion-icon :icon="arrowForwardOutline"></ion-icon></span></ion-card-title>
      </ion-card-header>
    </ion-card>
    
  </div>

</ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'

import { IonContent, IonItem ,IonPage, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonRefresher, IonRefresherContent, IonPopover, IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel, IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { menuOutline, filterOutline, arrowForwardOutline } from 'ionicons/icons'


import '../global.css'

import { useGlobalShare } from '@/stores';
import { useMainService } from '@/services';
export default defineComponent({
  components: {
    IonContent,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTabs,
    IonTabBar,
    IonIcon,
    IonTabButton,
    IonLabel,
    IonBadge,
    IonItem,
    IonButton,
    IonPopover,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle
    },
  name: 'LadingPage',
  setup(props) {
    const globalState = useGlobalShare();
    
    const mainService = useMainService();
    
    let limit = 2;

      const state = reactive({
      list: [] as any[]
      });

    function loadRecruits(limit:number,keyword:[]|null) {
      mainService.recruit_list(limit,keyword)
      .then(axiosResponse => {
        
        state.list = axiosResponse.data.body.recruits;

        for(var i = 0 ; i < axiosResponse.data.body.recruits.length; i++){
          let today = new Date();
          let regDate = new Date(state.list[i].deadline);

          state.list[i].dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
        }
        
      })
    }

    onMounted(() => {
      loadRecruits(limit,null); 
    });
    
    
    
  
    return {
      state,
      menuOutline,
      globalState,
      filterOutline,
      arrowForwardOutline
    }
  }
})

</script>

<style scoped>
.btn-menu {
  transform:translateY(-50%);
}
.btn-detail {
  border:2px solid #FFFFFF;
}
.bg-btn{
  background-color:#DADADA;
}
.bg-line{
  background-color:black;
  height:5px;
  width:135px;
  border-radius:10px;
}
ion-card {
  border-radius:25px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
  border:2px solid #DADADA;
}
ion-icon {
  --ionicon-stroke-width: 60px;
}
.subtitle{
background: linear-gradient(white 60%,rgba(200, 94, 94, 0.5) 40%);
}
</style>