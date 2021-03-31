<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="flex flex-col min-h-screen mb-20">

    <TitleBar title="회원 찾기 페이지" btn_back="true"></TitleBar>

    <div class="flex flex-col mt-4 w-72 text-white mx-auto">
      <router-link to="/usr/pd/findLoginId"><div class="relative btn-joinSel h-32 mt-2"><span class="inline-block left-1/2 top-1/2 relative">아이디 찾기</span><div class="top-1/2 mx-auto relative bg-line"></div></div></router-link>
      <router-link to="/usr/pd/findLoginPw"><div class="relative btn-joinSel h-32 mt-4"><span class="inline-block left-1/2 top-1/2 relative">비밀번호 찾기</span><div class="top-1/2 mx-auto relative bg-line"></div></div></router-link>
    </div>
  </div>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage, IonContent, IonIcon } from'@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import router from '@/router'

export default defineComponent({
  name: 'FindSelectPage',
  components: {
    IonPage,
    IonContent,
    IonIcon
  },
  props: {
    
  },
  setup(props) {

  function hisback() {
     router.back();
    }

   return {
     router,
     hisback,
     returnUpBackOutline
   }
    
  },
  methods : {
    
  }
  
})
</script>

<style scoped>
.btn-joinSel{
  background-color:#C4C4C4;
}
.btn-joinSel > span {
  transform: translate(-50%, -100%);
}
.btn-joinSel > div {
  transform: translateY(100%);
}
.bg-line{
  width:229px;
  height:4px;
  background-color:white;
}
</style>