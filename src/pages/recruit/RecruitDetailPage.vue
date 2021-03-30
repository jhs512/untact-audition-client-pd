<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="flex flex-col min-h-screen mb-20">
   
  <TitleBar title="Audictionary">
      <div class="hisback absolute left-5" v-on:click="hisback"><ion-icon :icon="returnUpBackOutline"></ion-icon></div>
  </TitleBar>    
  
  <div class="font-roboto font-black detail-container container flex flex-col">
    <div class="w-full mx-auto mt-4 text-center">
      <div class="text-lg font-coda font-normal">{{state.artwork.name}}</div>
      <div v-if="state.dateDiff >= 0" class="text-xs mt-2">남은 기간: {{state.dateDiff}}일</div>
      <div v-if="state.dateDiff < 0" class="text-xs mt-2">기한 마감</div>

      <div v-if="state.recruit.extra != null && state.recruit.extra.file__common__attachment[0].fileExtTypeCode == 'img'" class="img-container mx-4 mb-4 p-4 mt-6">  
      <img :src="state.recruit.extra.file__common__attachment[0].forPrintUrl" class="mx-auto">
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
  <BottomBar>
  </BottomBar>

</ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent,  reactive, onMounted } from 'vue'
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import router from '@/router'
import { IRecruit, IArtwork, IActingRole } from '../../types'
import { MainApi, useMainApi } from '../../apis'
import { useGlobalShare } from '@/stores'


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
      
      const mainApi:MainApi = useMainApi();
      
      
      const state = reactive({
      recruit: {} as IRecruit,
      artwork: {} as IArtwork,
      actingRole: {} as IActingRole,
      dateDiff: 0
      });

      

    function loadRecruit(id:number) {
      mainApi.recruit_detail(id)
      .then(axiosResponse => {
        state.recruit = axiosResponse.data.body.recruit;
        let today = new Date();
      let regDate = new Date(state.recruit.deadline);
      
      state.dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
      });
    }

    function loadArtwork(recruitId:number) {
      mainApi.artwork_detail(recruitId)
      .then(axiosResponse => {
        state.artwork = axiosResponse.data.body.artwork;
      });
    }
    function loadActingRole(recruitId:number) {
      mainApi.actingRole_detail(recruitId)
      .then(axiosResponse => {
        state.actingRole = axiosResponse.data.body.actingRole;
      });
    }

    onMounted(() => {
      loadRecruit(props.id);
      loadArtwork(props.id);
      loadActingRole(props.id);         
    });

    function hisback() {
      router.back();
    }
      

    return {
      state,    
      hisback,
      returnUpBackOutline
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