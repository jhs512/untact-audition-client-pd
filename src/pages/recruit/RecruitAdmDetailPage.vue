<template>
<ion-page>
  <ion-content :fullscreen="true">
    <IonRefresherC></IonRefresherC>
    <div class="flex flex-col min-h-screen mb-20">
    
    <TitleBar title="Audictionary" btn_back="true"></TitleBar>    

    <div class="bg-gray-300 mx-4 mt-10 rounded-lg flex flex-col items-center py-6 font-bold relative">
      <span>공고 간략 내용</span>
      <span>({{state.recruit.extra__aw_title}}/{{state.recruit.extra__ar_name}})</span>
      <router-link :to="`/usr/recruit/detail?id=${state.recruit.id}`">
        <span class="absolute text-xs top-3/4 right-4">자세히 보기</span>
      </router-link>
    </div>

    <span class="ml-auto mr-4 text-sm mt-10" :onclick="reset">초기화</span>

    <div class="mx-4 font-bold">
      <div class="flex items-center justify-between">
        <span class="py-2 my-1 bg-underline">지원자 현황({{state.apListAll.length}})</span>
        <span class="text-xs" :onclick="apListAllShow">모두 보기</span>
      </div>
      <div v-bind:key="ap" v-for="ap,index in state.apListAll">
        <router-link :to="`/usr/application/list?id=${state.recruit.id}`">
          <div class="p-4 flex justify-around items-center" v-if="index < state.apListAllShow">
            <div>{{ap.id}}.</div>
            <div class="ml-2 w-16 h-16 rounded-full">
              <img :src="ap.extra.file__profile__attachment[1].forPrintUrl" alt="" class="w-full h-full object-cover rounded-full">
            </div>
            <div class="ml-2 flex-1">이름: {{ap.name}}</div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="seperate-line"></div>

    <div class="mx-4 font-bold">
      <div class="flex items-center justify-between">
        <span class="py-2 my-1 bg-underline">LIKE({{state.apListLike.length}})</span>
        <span class="text-xs" :onclick="apListLikeShow">모두 보기</span>
      </div>
      <div v-bind:key="ap" v-for="ap,index in state.apListLike">
        <div class="p-4 flex justify-around items-center" v-if="index < state.apListLikeShow">
          <div>{{ap.id}}.</div>
          <div class="ml-2 w-16 h-16 rounded-full">
            <img :src="ap.extra.file__profile__attachment[1].forPrintUrl" alt="" class="w-full h-full object-cover rounded-full">
          </div>
          <div class="ml-2 flex-1">이름: {{ap.name}}</div>
        </div>
      </div>
    </div>

    <div class="seperate-line"></div>

    <div class="mx-4 font-bold">
      <div class="flex items-center justify-between">
        <span class="py-2 my-1 bg-underline">1차 통과({{state.apList1Pass.length}})</span>
        <span class="text-xs" :onclick="apList1PassShow">모두 보기</span>
      </div>
      <div v-bind:key="ap" v-for="ap,index in state.apList1Pass">
        <router-link :to="`/usr/application/list?id=${state.recruit.id}`">
          <div class="p-4 flex justify-around items-center" v-if="index < state.apList1PassShow">
            <div>{{ap.id}}.</div>
            <div v-if="ap.extra != null" class="ml-2 w-16 h-16 rounded-full border">
              <img :src="ap.extra.file__profile__attachment[1].forPrintUrl" alt="" class="w-full h-full object-cover rounded-full">
            </div>
            <div class="ml-2 flex-1">이름: {{ap.name}}</div>
          </div>
        </router-link>
      </div>
    </div>

  <!-- 2차 합격과 최종 합격 기능은 아직 구현하지 않기로 했습니다. 혹시 만들어진다면 주석 해제.
  <div class="seperate-line"></div>

  <div class="mx-4 font-bold">
    <div class="flex items-center justify-between">
      <span class="py-2 my-1 bg-underline">2차 통과({{state.apList2Pass.length}})</span>
      <span class="text-xs" :onclick="apList2PassShow">모두 보기</span>
    </div>
      <div v-bind:key="ap" v-for="ap,index in state.apList2Pass">
        <div class="p-4 flex justify-around items-center" v-if="index < state.apList2PassShow">
          <div>{{ap.id}}.</div>
          <div class="ml-2 w-16 h-16 rounded-full border"><img :src="ap.extra.file__profile__attachment[1].forPrintUrl" alt="" class="w-full h-full rounded-full"></div>
          <div class="ml-2 flex-1">이름: {{ap.name}}</div>
        </div>
      </div>
    </div>

    <div class="seperate-line"></div>

    <div class="mx-4 font-bold">
      <div class="flex items-center justify-between">
        <span class="py-2 my-1 bg-underline">최종 합격({{state.apList3Pass.length}})</span>
        <span class="text-xs" :onclick="apList3PassShow">모두 보기</span>
      </div>
      <div v-bind:key="ap" v-for="ap,index in state.apList3Pass">
        <div class="p-4 flex justify-around items-center" v-if="index < state.apList3PassShow">
          <div>{{ap.id}}.</div>
          <div class="ml-2 w-16 h-16 rounded-full border"><img :src="ap.extra.file__profile__attachment[1].forPrintUrl" alt="" class="w-full h-full rounded-full"></div>
          <div class="ml-2 flex-1">이름: {{ap.name}}</div>
        </div>
      </div>
    </div>
    -->
    </div>

  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent,  reactive, onMounted } from 'vue'
import { IonPage, IonContent, IonIcon, IonGrid, IonCol, IonRow, IonThumbnail, IonImg, IonAvatar  } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import { IRecruit, IAp } from '../../types'
import { useGlobalShare } from '@/stores'
import { useMainService } from '@/services'

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

      onMounted(() => {
        loadRecruit(props.id);
        loadAp(props.id);
      });
      
      const state = reactive({
      recruit: {} as IRecruit,
      apListLike:[] as IAp[],
      apListAll:[] as IAp[],
      apList1Pass:[] as IAp[],
      apList2Pass:[] as IAp[],
      apList3Pass:[] as IAp[],
      apListLikeShow:3,
      apListAllShow:3,
      apList1PassShow:3,
      apList2PassShow:3,
      apList3PassShow:3,
      dateDiff: 0
      });

      function apListAllShow(){
        state.apListAllShow = 100;
        state.apListLikeShow = 0;
        state.apList1PassShow = 0;
        state.apList2PassShow = 0;
        state.apList3PassShow = 0;
      }
      function apListLikeShow(){
        state.apListAllShow = 0;
        state.apListLikeShow = 100;
        state.apList1PassShow = 0;
        state.apList2PassShow = 0;
        state.apList3PassShow = 0;
      }
      function apList1PassShow(){
        state.apListAllShow = 0;
        state.apListLikeShow = 0;
        state.apList1PassShow = 100;
        state.apList2PassShow = 0;
        state.apList3PassShow = 0;
      }
      function apList2PassShow(){
        state.apListAllShow = 0;
        state.apListLikeShow = 0;
        state.apList1PassShow = 0;
        state.apList2PassShow = 100;
        state.apList3PassShow = 0;
      }
      function apList3PassShow(){
        state.apListAllShow = 0;
        state.apListLikeShow = 0;
        state.apList1PassShow = 0;
        state.apList2PassShow = 0;
        state.apList3PassShow = 100;
      }
      function reset(){
        state.apListAllShow = 3;
        state.apListLikeShow = 3;
        state.apList1PassShow = 3;
        state.apList2PassShow = 3;
        state.apList3PassShow = 3;
      }

    function loadRecruit(id: number) {
      mainApiService.recruit_detail(id)
      .then(axiosResponse => {
        state.recruit = axiosResponse.data.body.recruit;
        // regDate 정보로 남은 기간 계산
        const today = new Date();
        const regDate = new Date(state.recruit.deadline);
        
        state.dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
      });
    }

    function loadAp(recruitId: number){
      mainApiService.ap_list(recruitId)
      .then(axiosResponse => {
        state.apListAll = axiosResponse.data.body.apListAll;
        state.apListLike = axiosResponse.data.body.apListLike;
        state.apList1Pass = axiosResponse.data.body.apList1Pass;
        state.apList2Pass = axiosResponse.data.body.apList2Pass;
        state.apList3Pass = axiosResponse.data.body.apList3Pass;
      })
    }

    return {
      state,  
      returnUpBackOutline,
      globalState,
      apListAllShow,
      apListLikeShow,
      apList1PassShow,
      apList2PassShow,
      apList3PassShow,
      reset
    }
  }
})

</script>

<style scoped>
</style>