<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="flex flex-col min-h-screen mb-20">
   
  <TitleBar title="Audictionary" btn_back="true"></TitleBar>    

  <div class="bg-gray-300 mx-4 mt-2 rounded-lg flex flex-col items-center py-6 font-bold relative">
    <span>공고 간략 내용</span>
    <span>({{state.recruit.extra__aw_title}}/{{state.recruit.extra__ar_name}})</span>
    <router-link :to="`/usr/recruit/detail?id=${state.recruit.id}`">
    <span class="absolute text-xs top-3/4 right-4">자세히 보기</span>
    </router-link>
  </div>

  <div class="mx-4 mt-10 font-bold">
    <div class="flex items-center justify-between">
      <span class="py-2 my-1 bg-underline">지원자 현황({{state.apList.length}})</span>
      <span class="text-xs">모두 보기</span>
    </div>
    <router-link :to="`/usr/application/list?id=${state.recruit.id}`">
    <div class="p-4 flex justify-around items-center" v-bind:key="ap" v-for="ap in state.apList">
      <div>{{ap.id}}.</div>
      <div class="ml-2 w-16 h-16 rounded-full"><img :src="ap.extra__thumbImg" alt="" class="w-full h-full rounded-full"></div>
      <div class="ml-2 flex-1">이름: {{ap.name}}</div>
    </div>
    </router-link>
  </div>

  <div class="seperate-line"></div>

   <div class="mx-4 font-bold">
    <div class="flex items-center justify-between">
      <span class="py-2 my-1 bg-underline">1차 통과({{state.apList1pass.length}})</span>
      <span class="text-xs">모두 보기</span>
    </div>
    <router-link :to="`/usr/application/list?id=${state.recruit.id}`">
    <div class="p-4 flex justify-around items-center" v-bind:key="ap" v-for="ap in state.apList1pass">
      <div>{{ap.id}}.</div>
      <div class="ml-2 w-16 h-16 rounded-full border"><img :src="ap.extra__thumbImg" alt="" class="w-full h-full rounded-full"></div>
      <div class="ml-2 flex-1">이름: {{ap.name}}</div>
    </div>
    </router-link>
  </div>

  <div class="seperate-line"></div>

<div class="mx-4 font-bold">
  <div class="flex items-center justify-between">
    <span class="py-2 my-1 bg-underline">2차 통과({{state.apList2pass.length}})</span>
    <span class="text-xs">모두 보기</span>
  </div>
    <div class="p-4 flex justify-around items-center" v-bind:key="ap" v-for="ap in state.apList2pass">
      <div>{{ap.id}}.</div>
      <div class="ml-2 w-16 h-16 rounded-full border"><img :src="ap.extra__thumbImg" alt="" class="w-full h-full rounded-full"></div>
      <div class="ml-2 flex-1">이름: {{ap.name}}</div>
    </div>
  </div>

  <div class="seperate-line"></div>

  <div class="mx-4 font-bold">
    <div class="flex items-center justify-between">
      <span class="py-2 my-1 bg-underline">최종 합격({{state.apList3pass.length}})</span>
      <span class="text-xs">모두 보기</span>
    </div>
    <div class="p-4 flex justify-around items-center" v-bind:key="ap" v-for="ap in state.apList3pass">
      <div>{{ap.id}}.</div>
      <div class="ml-2 w-16 h-16 rounded-full border"><img :src="ap.extra__thumbImg" alt="" class="w-full h-full rounded-full"></div>
      <div class="ml-2 flex-1">이름: {{ap.name}}</div>
    </div>
  </div>

  </div>
  


</ion-content>

</ion-page>
</template>

<script lang="ts">
import { defineComponent,  reactive, onMounted } from 'vue'
import { IonPage, IonContent, IonIcon, IonGrid, IonCol, IonRow, IonThumbnail, IonImg, IonAvatar  } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import router from '@/router'
import { IRecruit, IArtwork, IActingRole, IAp } from '../../types'

import { useGlobalShare } from '@/stores'
import { useMainService } from '@/services'
import axios from 'axios'


export default defineComponent({
  components: { 
    IonPage,
    IonContent,
    IonIcon,
    IonGrid, 
    IonCol, 
    IonRow,
    IonThumbnail, 
    IonImg, 
    IonAvatar 
    },
  name: 'RecruitAdmDetailPage',
  props:{
    id: {
      type: Number,
      required:true
    }
  },
  setup(props) {
      const globalState = useGlobalShare();
      const mainApiService = useMainService();
      
      const state = reactive({
      recruit: {} as IRecruit,
      aps:[] as IAp[],
      dateDiff: 0
      });

    function loadRecruit(id:number) {
      mainApiService.recruit_detail(id)
      .then(axiosResponse => {
        state.recruit = axiosResponse.data.body.recruit;
        let today = new Date();
        let regDate = new Date(state.recruit.deadline);
      
        state.dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
      });
    }

    function loadAp(recruitId:number){
      mainApiService.ap_list(recruitId)
      .then(axiosResponse => {
        state.aps = axiosResponse.data.body.aps;
      })
    }


    onMounted(() => {
      loadRecruit(props.id);
      loadAp(props.id);
    });

    
      

    return {
      state,  
      returnUpBackOutline,
      globalState
    }
  }
})

</script>

<style scoped>
.bg-underline{
  border-bottom:1px solid rgba(0,0,0,0.3);
}
.seperate-line{
  height:1px;
  background:rgba(0,0,0,0.3);
  margin-top:20px;
  margin-bottom:20px;
}
</style>