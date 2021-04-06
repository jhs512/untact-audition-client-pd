<template>
<ion-page>
  <ion-content :fullscreen="true">
    
  <IonRefresherC></IonRefresherC>

    <div v-if="globalState.isLogined" class="flex flex-col min-h-screen">
    
    <TitleBar title="Audictionary" btn_menu="true"></TitleBar>    
   
  
    <div id="list" class="flex flex-col font-roboto">
    <div class="recruit-list text-white container mx-auto" v-bind:key="recruit.id" v-for="recruit in state.recruits">
      <div class="ml-4 mt-2 text-xs">NEW 오디션 : 방금 올라온 공고</div>
      <div class="mt-2 text-center text-xl">{{recruit.title}}</div>
      <div class="mt-1 text-center text-xs">{{recruit.body}}</div>
      <div class="flex my-8 justify-center">
        <router-link :to="`/usr/recruit/detail?id=${recruit.id}`">
        <ion-button  color="light" size="small" fill="outline">
          공고보기
        </ion-button>
        </router-link>
      </div>

      <div v-if="recruit.extra != null" class="mx-4 mb-4">  
      <img :src="recruit.extra.file__common__attachment[1].forPrintUrl" alt="" class="object-contain mx-auto">
      </div>
    </div>
    </div>

  </div>

      <ion-infinite-scroll threshold="200px" id="infinite-scroll" @ionInfinite="loadData($event)" class='mt-4'>
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>

</ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { IRecruit } from '../types/'
import { MainApi, useMainApi } from '../apis/'
import { IonContent, IonItem ,IonPage, IonButton, IonInfiniteScroll, IonInfiniteScrollContent, IonRefresher, IonRefresherContent, IonPopover, IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel, IonBadge } from '@ionic/vue';
import { menuOutline } from 'ionicons/icons'

import Popover from './popover.vue'
import * as Util from '@/utils'
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
    Popover
    },
  name: 'MainPage',
  setup(props) {
    const globalState = useGlobalShare();
    
    const mainService = useMainService();
    
    let limit = 5;
    let isAllLoaded = false;

      const state = reactive({
      recruits: [] as IRecruit[]
      });

    function loadRecruits(limit:number) {
      mainService.recruit_list(limit)
      .then(axiosResponse => {
        state.recruits = axiosResponse.data.body.recruits;
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
      globalState
    }
  }
})

</script>

<style scoped>
.recruit-list:nth-child(odd) {
  background-color:#50555C;
}
.recruit-list:nth-child(even) {
  background-color:#C4C4C4;
}
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
</style>