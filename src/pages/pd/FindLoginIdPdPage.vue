<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="login-form flex flex-col relative min-h-screen mb-20">

    <TitleBar title="로그인 아이디 찾기 페이지" btn_back="true">
    </TitleBar>


    <div v-if="state.isFind == false" class=" w-60 mx-auto mt-8 flex flex-col">
      <form action="" v-on:submit.prevent="checkAndFind">
        <FormRow title="이름:">
          <input ref="nameElRef" type="text" class="w-full mt-2px">
        </FormRow>
        <FormRow title="주민등록번호:">
          <div class="flex w-full mt-2">
          <input type="text" ref="regNumberElRef" class="w-full text-center" maxlength="6">
          <span class="mx-1">-</span>
          <input type="text" ref="regNumber2ElRef" class="w-full text-center" maxlength="7">
          </div>
        </FormRow>
      <input type="submit" class="w-60 mt-10 text-center btn-next text-xs text-black mx-auto p-2" value="FIND">
      </form>
    </div>

    <div v-if="state.isFind" class="w-60 mx-auto mt-8 text-center flex flex-col">
       <div class="text-sm">회원님의 이메일(아이디)는</div>
       <div class="my-3 text-lg bg-gray-200">{{state.loginId}}</div>
       <div class="text-sm">입니다.</div>
    </div>

     <router-link v-if="state.isFind" to="/usr/pd/login"><div class="w-60 mt-10 text-center btn-next text-xs text-black mx-auto p-2">로그인하러 가기</div></router-link> 
  </div>
  </ion-content>
</ion-page>

</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import { MainApi, useMainApi } from '../../apis'
import router from '@/router'

export default defineComponent({
  name: 'FindLoginIdPdPage',
  components: {
    IonPage,
    IonContent,
    IonIcon
  },
  props: {
  },
  setup(props) {
    
    const mainApi:MainApi = useMainApi();

    const nameElRef = ref<HTMLInputElement>();
    const regNumberElRef = ref<HTMLInputElement>();
    const regNumber2ElRef = ref<HTMLInputElement>();
    

    function checkAndFind() {
      // 이름 체크
      if ( nameElRef.value == null ) {
        return;
      }

      const nameEl = nameElRef.value;

      if ( nameEl.value.length == 0 ) {
        alert('이름을 입력해 주세요.');
        nameEl.focus();
        return;
      }

      // 주민등록번호 체크
      if ( regNumberElRef.value == null ) {
        return;
      }

      const regNumberEl = regNumberElRef.value;

      if ( regNumberEl.value.length == 0 ) {
        alert('주민등록번호를 제대로 입력해 주세요.');
        regNumberEl.focus();
        return;
      }

      if ( regNumber2ElRef.value == null ) {
        return;
      }

      const regNumber2El = regNumber2ElRef.value;

      if ( regNumber2El.value.length == 0 ) {
        alert('주민등록번호를 입력해 주세요.');
        regNumber2El.focus();
        return;
      }
      let gender = '';
      if ( regNumber2El.value.substring(1,1) == '1' || regNumber2El.value.substring(1,1) == '3') {
        gender = '남';
      } 
      else {
        gender = '여';
      }

      const regNumber = regNumberEl.value + regNumber2El.value;
      findLoginId(nameEl.value, regNumber);
    }
    

    const state = reactive({
      loginId: '',
      isFind: false
    });

    function findLoginId( name:String, regNumber:String) {
       mainApi.pd_doFindLoginId( name, regNumber )
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }
          state.loginId = axiosResponse.data.body.pd.loginId;
          state.isFind = true;
        });
    }

    function hisback() {
     router.back();
    }

    return {
    checkAndFind,
    nameElRef,
    regNumberElRef,
    regNumber2ElRef,
    router,
    state,
    hisback,
    returnUpBackOutline
   }
  }
  
  
})
</script>

<style scoped>
input {
  border:2px solid #D4D4D4;
}
.login-form {
  color:#555050;
}
.bg-line-sep {
  height:2px;
  background-color:#DADADA;
  border-radius:10px;
}
.btn-next {
  background-color:#C4C4C4;
  border-radius:6px;
}

</style>