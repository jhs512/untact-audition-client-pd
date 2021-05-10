<template>
<ion-page>
  <ion-content :fullscreen="true">
    
  <IonRefresherC></IonRefresherC>

    <div class="flex flex-col min-h-screen">
    
    <TitleBar title="Audictionary" btn_menu="true" class="border-b"></TitleBar>   

    <div class="relative text-center">
      <span class="text-xl font-bold">내 공고현황</span>
      <span class="absolute top-1 right-4" :onclick="reset">초기화</span>
    </div>

    <div class="mx-4 mb-10" v-if="state.notExpiredListShow > 0">
      <span class="px-4 py-2 bg-underline font-bold">공고 중</span>
      <div v-bind:key="recruit" v-for="(recruit,index) in state.notExpiredList">
      <router-link :to="`/usr/recruit/admDetail?id=${recruit.id}`">
        <div v-if="recruit.dateDiff >= 0 && index < state.notExpiredListShow" class="flex justify-between text-center mt-4 bg-gray-100 py-2 px-4">
         <span class="flex-1">가제: {{recruit.title}}</span>
         <span class="flex-1">배역: {{recruit.extra__ar_name}}</span>
         <span class="flex-1">{{recruit.extra__application__count}}</span>
        </div>
      </router-link>
      </div>
      <div class="flex">
        <span class="mt-2 ml-auto text-sm" :onclick="showAllNotExpiredList">모두 보기</span>
      </div>
    </div> 

     <div class="mx-4" v-if="state.expiredListShow > 0">
       <span class="px-4 py-2 bg-underline font-bold">공고 마감</span>  
       <div v-bind:key="recruit" v-for="(recruit,index) in state.expiredList" class="mt-4">
      <router-link :to="`/usr/recruit/admDetail?id=${recruit.id}`">
        <div v-if="recruit.dateDiff < 0 && index < state.expiredListShow" class="flex justify-between text-center mt-4 bg-gray-100 py-2 px-4">
         <span class="flex-1">가제: {{recruit.title}}</span>
         <span class="flex-1">배역: {{recruit.extra__ar_name}}</span>
         <span class="flex-1">{{recruit.extra__application__count}}</span>
        </div>
      </router-link>
      </div>  
      <div class="flex">
        <span class="mt-2 ml-auto text-sm" :onclick="showAllExpiredList">모두 보기</span>
      </div>
    </div> 
  
   
   
   <!--
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
    -->

  </div>

</ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'

import { IonContent, IonItem ,IonPage, IonButton, IonInput, IonInfiniteScroll, IonInfiniteScrollContent, IonRefresher, IonRefresherContent, IonPopover, IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel, IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonThumbnail, IonImg, IonAvatar, IonChip, popoverController } from '@ionic/vue';
import { menuOutline, filterOutline } from 'ionicons/icons'

import $ from 'jquery'
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
    IonInput,
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
    IonThumbnail,
    IonAvatar,
    IonImg,
    IonChip
    },
  name: 'RecruitAdmListPage',
  setup(props) {
    const globalState = useGlobalShare();
    
    const mainService = useMainService();
  
    const state = reactive({
    list: [] as any[],
    expiredList:[] as any[],
    notExpiredList:[] as any[],
    expiredListShow: 3,
    notExpiredListShow: 3,
    });

    function showAllNotExpiredList(){
      state.notExpiredListShow = 100;
      state.expiredListShow = 0;
    }
    function showAllExpiredList(){
      state.expiredListShow = 100;
      state.notExpiredListShow = 0;
    }
    function reset(){
      state.expiredListShow = 3;
      state.notExpiredListShow = 3;
    }

    function loadRecruits(id: number) {
      mainService.recruit_listByMemberId(id)
      .then(axiosResponse => {

         state.list = axiosResponse.data.body.recruits;

        for(let i = 0 ; i < axiosResponse.data.body.recruits.length; i++){
          
          const today = new Date();
          const regDate = new Date(state.list[i].deadline);

          state.list[i].dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
          if(state.list[i].dateDiff > 0 ){
            state.notExpiredList.push(state.list[i]);
          } else {
            state.expiredList.push(state.list[i]);
          }
          
        }
        
      })
      
    }

    onMounted(() => {
      loadRecruits(globalState.loginedMember.id); 
    });
    
  
    return {
      state,
      menuOutline,
      globalState,
      filterOutline,
      showAllNotExpiredList,
      showAllExpiredList,
      reset
    }
  }
})

</script>

<style scoped>
.bg-underline{
  border-bottom:1px solid rgba(0,0,0,0.3);
}
</style>