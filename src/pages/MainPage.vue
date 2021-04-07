<template>
<ion-page>
  <ion-content :fullscreen="true">
    
  <IonRefresherC></IonRefresherC>

    <div v-if="globalState.isLogined" class="flex flex-col min-h-screen">
    
    <TitleBar title="Audictionary" btn_menu="true" class="border-b"></TitleBar>    

    <div class="ml-auto mr-4">
      <div class="text-xs font-bold flex items-center">필터<ion-icon :icon="filterOutline" class="ml-1"></ion-icon></div>
    </div>
   
   <router-link :to="`/usr/recruit/detail?id=${recruit.id}`" v-bind:key="recruit" v-for="recruit in state.list">
    <ion-card class="text-white py-4">
     <ion-card-header class="text-center">
       <ion-card-title>가제 : {{recruit.title}}</ion-card-title>
       <ion-card-subtitle>감독 : {{recruit.director}}</ion-card-subtitle>
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
        <ion-card-subtitle>배역이름 : {{recruit.name}}</ion-card-subtitle>
        <ion-card-subtitle>배역설명 : {{recruit.character}}</ion-card-subtitle>
      </ion-card-header>
    </ion-card>
    </router-link>

  </div>

      <ion-infinite-scroll threshold="150px" id="infinite-scroll" @ionInfinite="loadData($event)" class='mt-4'>
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>

</ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'

import { IonContent, IonItem ,IonPage, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonRefresher, IonRefresherContent, IonPopover, IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel, IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { menuOutline, filterOutline } from 'ionicons/icons'

import Popover from './popover.vue'
import './global.css'

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
    IonCardTitle,
    Popover
    },
  name: 'MainPage',
  setup(props) {
    const globalState = useGlobalShare();
    
    const mainService = useMainService();
    
    let limit = 5;
    let isAllLoaded = false;

      const state = reactive({
      list: [] as any[]
      });

    function loadRecruits(limit:number) {
      mainService.recruit_list(limit)
      .then(axiosResponse => {
        
        state.list = axiosResponse.data.body.recruits;
        for(var i = 0 ; i < axiosResponse.data.body.artworks.length; i++){
          state.list[i].director = axiosResponse.data.body.artworks[i].director;
          state.list[i].name = axiosResponse.data.body.actingRoles[i].name;
          state.list[i].character = axiosResponse.data.body.actingRoles[i].character;
          
          let today = new Date();
          let regDate = new Date(state.list[i].deadline);

          state.list[i].dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
        }
        
        if( axiosResponse.data.body.isAllLoaded == true ){
          isAllLoaded = true;
        }
      })
    }

    onMounted(() => {
      loadRecruits(limit); 
    });
    
    

   async function loadData(event:any){
     if ( isAllLoaded ) {
        event.target.setAttribute('disabled' , 'true');
      }
      await wait(500);
      event.target.complete();
      limit = limit + 2;
      addData(limit);
      
    }
    
    function addData(limit:number){
      loadRecruits(limit);
    }

    async function wait(time:any) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('');
        }, time);
      });
    }

  
    
  
    return {
      state,
      menuOutline,
      loadData,
      globalState,
      filterOutline
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
</style>