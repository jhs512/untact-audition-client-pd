<template>
  <div class="flex flex-col min-h-screen mb-20">

    <TitleBar title="회원가입 페이지" btn_back="true"></TitleBar>

    <div class="flex flex-col mt-4 w-72 text-white mx-auto">
      <div class="relative btn-joinSel h-32 mt-2"><span class="inline-block left-1/2 top-1/2 relative">아티스트로 시작하기</span><div class="top-1/2 mx-auto relative bg-line"></div></div>
      <router-link to="/usr/pd/join"><div class="relative btn-joinSel h-32 mt-4"><span class="inline-block left-1/2 top-1/2 relative">제작자로 시작하기</span><div class="top-1/2 mx-auto relative bg-line"></div></div></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '@/router'

export default defineComponent({
  name: 'JoinSelectPage',
  components: {
  },
  props: {
    
  },
  setup(props) {

   function hisback() {
     router.back();
    }
   return {
     router,
     hisback
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