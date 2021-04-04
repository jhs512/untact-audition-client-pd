<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="flex flex-col min-h-screen mb-20">
   
  <TitleBar title="Audictionary" btn_back="true"></TitleBar>    
  
  <div class="font-roboto font-black detail-container container flex flex-col">
    <div class="w-full mx-auto mt-4 text-center">
      <div class="text-lg font-coda font-normal">{{state.artwork.name}}</div>
      <div v-if="state.dateDiff >= 0" class="text-xs mt-2">남은 기간: {{state.dateDiff}}일</div>
      <div v-if="state.dateDiff < 0" class="text-xs mt-2">기한 마감</div>
      <router-link v-if="state.recruit.memberId == globalState.loginedMember.id" :to="`/usr/recruit/modify?id=${state.recruit.id}`">수정</router-link>

      <div v-if="state.recruit.extra != null && state.recruit.extra.file__common__attachment[0].fileExtTypeCode == 'img'" class="img-container mx-4 mb-4 p-4 mt-6">  
      <img :src="state.recruit.extra.file__common__attachment[0].forPrintUrl" class="detail_img mx-auto">
      </div>
    </div>

    <div class="w-full text-xs mx-auto">
      <div class="mx-4">감독: {{state.artwork.director}}</div>
      <div class="mx-4 mt-2">배역: {{state.recruit.roleType}}</div>
    </div>

    <div class="w-full mx-auto mt-6 font-black">
      <div class="mx-4 text-sm">CASTING INFO</div>
      <div class="mx-4 mt-2 text-xs">GENDER.  {{state.actingRole.gender}}</div>
      <div class="mx-4 mt-2 text-xs">CHARACTER.  {{state.actingRole.character}}</div>
    </div>

    <div class="flex w-full mx-auto mt-8 text-sm">
      <div class="btn-like py-1 px-10 bg-black text-white mx-auto">좋아요</div>
      <div class="btn-apply py-1 px-10 mx-auto">지원하기</div>
    </div>
  </div>
  

</div>
  

</ion-content>

</ion-page>
</template>

<script lang="ts">
import { defineComponent,  reactive, onMounted } from 'vue'
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import router from '@/router'
import { IRecruit, IArtwork, IActingRole } from '../../types'

import { useGlobalShare } from '@/stores'
import { useMainService } from '@/services'


export default defineComponent({
  components: { 
    IonPage,
    IonContent,
    IonIcon
    },
  name: 'RecruitDetailPage',
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
      artwork: {} as IArtwork,
      actingRole: {} as IActingRole,
      dateDiff: 0
      });

    

    function loadRecruit(id:number) {
      mainApiService.recruit_detail(id)
      .then(axiosResponse => {
        state.recruit = axiosResponse.data.body.recruit;
        state.artwork = axiosResponse.data.body.artwork;
        state.actingRole = axiosResponse.data.body.actingRole;
        let today = new Date();
        let regDate = new Date(state.recruit.deadline);
      
      state.dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
      });
    }


    onMounted(() => {
      loadRecruit(props.id);
    });

    function hisback() {
      router.back();
    }
      

    return {
      state,    
      hisback,
      returnUpBackOutline,
      globalState
    }
  }
})

</script>

<style scoped>
.detail-container{
  border-top:1px solid rgba(0,0,0,0.3);
}
.img-container{
  background-color: #D4D4D4;
}
.btn-like {
  border:2px solid black;
  border-radius:6px;
}
.btn-apply {
  border:2px solid black;
  border-radius:6px;
}
</style>