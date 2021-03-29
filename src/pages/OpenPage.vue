<template>
<ion-page>
  <ion-content :fullscreen="true">
    <div class="flex flex-col min-h-screen">

  <div class="container flex flex-1 items-center mx-auto">
    <div class="mx-auto">
      <span class="font-coda text-4xl">Audictionary</span>
    </div>
  </div>

<div class="container mx-auto flex flex-col justify-center h-42">
  <div class="w-60 mx-auto flex flex-col items-center">
    <router-link to="/usr/pd/login" class="ml-auto"><div class=" w-26 text-xs">제작자로 로그인하기</div></router-link>
    <router-link to="" class="w-full"><div class="bg-btn mx-auto w-full text-center p-1 mt-1">로그인</div></router-link>
    <router-link to="/usr/member/joinTos" class="w-full"><div class="bg-btn mx-auto w-full text-center p-1 mt-4">회원가입</div></router-link>
  </div>
</div>
<div class="bg-line-container h-32 flex items-center justify-center"><div class="bg-line"></div></div>

</div>

  </ion-content>

</ion-page>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MainApi, useMainApi } from '../apis'
import { IonContent, IonPage } from '@ionic/vue';
import { menuOutline } from 'ionicons/icons'

import TitleBar from '../components/TitleBar.vue';
import BottomBar from '../components/BottomBar.vue';
import router from '@/router';
import { useGlobalShare } from '@/stores';


export default defineComponent({
  components: { 
    TitleBar,
    BottomBar,
    IonContent,
    IonPage
    },
  name: 'OpenPage',
  props:{
    globalState:{
      type:Object,
      required:true
    }
  },
  setup(props) {
    const globalState = useGlobalShare();
    console.log(globalState);
      const mainApi:MainApi = useMainApi();
    
    return {
      menuOutline
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