<template>
<ion-page>
  <ion-content :fullscreen="true">
    
  <IonRefresherC></IonRefresherC>

    <div v-if="globalState.isLogined" class="flex flex-col min-h-screen">
    
    <TitleBar title="Audictionary" btn_menu="true" class="border-b"></TitleBar>    
    <div class="ml-auto mr-4 mb-8" >
      <div class="text-xs font-bold flex items-center" @click="setOpen(true, $event)">필터<ion-icon :icon="filterOutline" class="ml-1"></ion-icon></div>
      <ion-popover mode="md" :is-open="isOpenRef" :translucent="true" :onDidDismiss="setClose(false)">
        <ion-content>
          <div class="p-4">
            <ion-chip outline :class="`chip_${index}`" @click="filterAdd(item,$event)" v-bind:key="item" v-for="(item,index) in filterItems">{{item}}</ion-chip>
          </div>
          <ion-button @click="filterSave">저장하기</ion-button>
        </ion-content>
      </ion-popover>
    </div>
   
   <router-link :to="`/usr/recruit/detail?id=${recruit.id}`" v-bind:key="recruit" v-for="recruit in state.list">
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
      <!--
      <ion-thumbnail v-if="recruit.extra == null" class="w-60 h-60 mx-auto">  
      <ion-img src="/gen/Avatar.jpeg" alt="Avatar" class="object-contain mx-auto"></ion-img>
      </ion-thumbnail>
      -->
      <ion-card-header class="text-center">
        <ion-card-subtitle>배역이름 : {{recruit.extra__ar_name}}</ion-card-subtitle>
        <ion-card-subtitle>배역설명 : {{recruit.extra__ar_character}}</ion-card-subtitle>
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
  name: 'RecruitListPage',
  setup(props) {
    const globalState = useGlobalShare();
    
    const mainService = useMainService();
    
    let limit = 5;
    let isAllLoaded = false;

      const state = reactive({
      list: [] as any[]
      });

    function loadRecruits(limit: number,keyword: []) {
      mainService.recruit_list(limit,keyword)
      .then(axiosResponse => {
        
        state.list = axiosResponse.data.body.recruits;
        for(let i = 0 ; i < axiosResponse.data.body.artworks.length; i++){
          
          const today = new Date();
          const regDate = new Date(state.list[i].deadline);

          state.list[i].dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
        }
        
        if( axiosResponse.data.body.isAllLoaded == true ){
          isAllLoaded = true;
        }
        
      })
      
    }

    onMounted(() => {
      loadRecruits(limit,filter); 
    });
    
    

   async function loadData(event: any){
     if( isAllLoaded == false){
        event.target.removeAttribute('disable');
     }
     if ( isAllLoaded ) {
        event.target.setAttribute('disabled' , 'true');
      }
      await wait(500);
      event.target.complete();
      limit = limit + 2;
      addData(limit);
      
    }
    
    function addData(limit: number){
      loadRecruits(limit,filter);
    }

    async function wait(time: any) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('');
        }, time);
      });
    }

  
    
    const isOpenRef = ref(false);

    const isChecked = ref('')
    
    const setOpen = (isOpened: boolean) => {
      isOpenRef.value = isOpened;
      setTimeout(() => {
         for(let i = 0 ; i < filterItems.length ; i ++){
        if (filter.indexOf(filterItems[i]) >= 0 ) {
          $('.chip_'+i).css("background-color","#C4C4C4");
        }
      }
      }, 100);
     
    }
    const setClose = ( isOpened: boolean) => {
      isOpenRef.value = isOpened;
    }

    
    const filterItems = [
      "영화",
      "드라마",
      "연극",
      "독립영화",
      "현재 진행중인 공고",
      "남자 캐스팅",
      "여자 캐스팅",
      "성별 무관 캐스팅",
      "영유아 캐스팅",
      "10대 캐스팅",
      "20대 캐스팅",
      "30대 캐스팅",
      "40-50대 캐스팅",
      "60대 이상 캐스팅",
    ] as any

    const filter = [

    ] as any
    
    function filterAdd (item: string,event: any) {
      
      if(filter.indexOf(item) < 0 ){
        filter.push(item);
        $('.chip_'+filterItems.indexOf(item)).css("background-color","#C4C4C4");
      } else {
        filter.splice(filter.indexOf(item), 1);
        $('.chip_'+filterItems.indexOf(item)).css("background-color","white");
      }
    }

  
    function filterSave(){
      limit = 5;
      isAllLoaded = false;
      $('ion-infinite-scroll').removeAttr('disabled'); 
      loadRecruits(limit,filter);
      const pc = popoverController;
      pc.dismiss();
      isOpenRef.value = false;
    }
  
    return {
      state,
      menuOutline,
      loadData,
      globalState,
      filterOutline,
      isOpenRef,
      isChecked,
      setOpen,
      setClose,
      filterItems,
      filterAdd,
      filterSave
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
ion-chip{
  color:black;
  border:1px solid black;
}
</style>