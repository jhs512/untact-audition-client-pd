<template>

<ion-page>
  <ion-content :fullscreen="true">
  <div class="flex flex-col min-h-screen mb-20">

    <TitleBar title="회원가입 페이지" btn_back="true"></TitleBar>

    <div class="flex flex-col mx-auto mt-4">
      <span class="text-center text-sm">이용 약관 동의</span>
      <div class="mt-4">
        <ul class="p-1 text-10px tos-list">
          <li class="flex p-1"><input id="tos1" type="checkbox" :checked="state.isCheckTos1" v-on:change="checkTos1"><label for="tos1" class="ml-2 mr-3 flex-1">이용약관</label><div class="px-3 btn-detail">자세히보기</div></li>
          <li class="flex p-1"><input id="tos2" type="checkbox" :checked="state.isCheckTos2" v-on:change="checkTos2"><label for="tos2" class="ml-2 mr-3 flex-1">개인정보 수집 및 이용에 대한 동의</label><div class="px-3 btn-detail">자세히보기</div></li>
          <li class="flex p-1"><input id="tos3" type="checkbox" :checked="state.isCheckTos3" v-on:change="checkTos3"><label for="tos3" class="ml-2 mr-3 flex-1">개인정보의 제3자 제공에 대한 동의</label><div class="px-3 btn-detail">자세히보기</div></li>
        </ul>
        
        <div class="flex mt-1 p-2 text-10px"><input id="tosAll" type="checkbox" v-on:change="check" :checked="state.isCheckTos1 && state.isCheckTos2 && state.isCheckTos3"><label for="tosAll" class="ml-2 mr-3 flex-1">약관 내용을 숙지하였으며, 위 모든 약관에 동의합니다.</label></div>
        <div class="flex mt-4 text-center justify-around text-10px">
          <div class="btn-disagree" v-on:click="hisback">동의하지 않습니다</div>
          <div class="btn-agree" v-on:click="checkAndNext">동의합니다</div>
        </div>
        
      </div>
    </div>
  </div>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'

import router from '@/router'

export default defineComponent({
  name: 'JoinTosPage',
  components: {
    IonPage,
    IonContent,
    IonIcon
  },
  props: {
    
  },
  setup(props) {

    const state = reactive({
      isCheckTos1: false,
      isCheckTos2: false,
      isCheckTos3: false
    });
    function checkTos1(event:any) {
      if (event.target.checked) {
        state.isCheckTos1 = true;
      } else {
        state.isCheckTos1 = false;
      }
     }
     function checkTos2(event:any) {
      if (event.target.checked) {
        state.isCheckTos2 = true;
      } else {
        state.isCheckTos2 = false;
      }
     }
     function checkTos3(event:any) {
      if (event.target.checked) {
        state.isCheckTos3 = true;
      } else {
        state.isCheckTos3 = false;
      }
     }
    
    function check(event:any){
      if(event.target.checked) {
        state.isCheckTos1 = true;
        state.isCheckTos2 = true;
        state.isCheckTos3 = true;
      }else {
        state.isCheckTos1 = false;
        state.isCheckTos2 = false;
        state.isCheckTos3 = false;
      }
    }
    function hisback() {
     router.back();
    }

    function checkAndNext(){
      
      if( state.isCheckTos1 == false || state.isCheckTos2 == false || state.isCheckTos3 == false ) {
        return;
      }
      
      router.replace('/usr/pd/join');
    }

   return {
     router,
     check,
     state,
     checkTos1,
     checkTos2,
     checkTos3,
     checkAndNext,
     hisback,
     returnUpBackOutline
   }
  }
  
})
</script>

<style scoped>
.tos-list {
  border-top:3px solid #C4C4C4;
  border-bottom:3px solid #C4C4C4;
}
.btn-detail {
  border:1px solid #DADADA;
}
.btn-disagree {
  padding:2px;
  width:123px;
 background-color:#C4C4C4; 
}
.btn-agree {
  padding:2px;
  width:123px;
  background-color: #C85E5E;
}
</style>