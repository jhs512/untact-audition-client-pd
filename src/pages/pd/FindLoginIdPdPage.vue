<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="login-form flex flex-col relative min-h-screen mb-20">

    <TitleBar title="로그인 아이디 찾기 페이지" btn_back="true">
    </TitleBar>


    <div v-if="state.isFind == false" class=" w-60 mx-auto mt-8 flex flex-col">
      <form action="" v-on:submit.prevent="checkAndFind">
        <FormRow title="이름:">
          <ion-input v-model="input.nameEl" ref="nameElRef" type="text" class="w-full mt-2px"></ion-input>
        </FormRow>
        <FormRow title="주민등록번호:">
          <div class="flex items-center w-full mt-2">
          <ion-input v-model="input.regNumber1El" type="text" ref="regNumberElRef" class="w-full text-center" maxlength="6"></ion-input>
          <span class="mx-1">-</span>
          <ion-input v-model="input.regNumber2El" type="text" ref="regNumber2ElRef" class="w-full text-center" maxlength="7"></ion-input>
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
import { IonPage, IonContent, IonIcon, IonInput } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import * as Util from '@/utils'
import router from '@/router'
import { MainService, useMainService } from '@/services'
import * as Crypto from 'crypto-ts'
export default defineComponent({
  name: 'FindLoginIdPdPage',
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonInput
  },
  props: {
  },
  setup(props) {
    
    const mainApiService = useMainService();

    const nameElRef = ref<HTMLInputElement>();
    const regNumberElRef = ref<HTMLInputElement>();
    const regNumber2ElRef = ref<HTMLInputElement>();
    
    const input = reactive({
      nameEl:'',
      regNumber1El:'',
      regNumber2El:''
    })

    function checkAndFind() {
      // 이름 체크
      if ( input.nameEl.length == 0 ) {
        alert('이름을 입력해 주세요.');
        
        return;
      }

      // 주민등록번호 체크

      if ( input.regNumber1El.length == 0 ) {
        alert('주민등록번호를 제대로 입력해 주세요.');
        
        return;
      }
      if ( input.regNumber2El.length == 0 ) {
        alert('주민등록번호를 입력해 주세요.');
        
        return;
      }
      let gender = '';
      if ( input.regNumber2El.substring(1,1) == '1' || input.regNumber2El.substring(1,1) == '3') {
        gender = '남';
      } 
      else {
        gender = '여';
      }

      const regNumberEl = input.regNumber1El + input.regNumber2El;  
      const regNumber = Crypto.AES.encrypt(regNumberEl,'regKey');

      findLoginId(input.nameEl, regNumber.toString());
    }
    

    const state = reactive({
      loginId: '',
      isFind: false
    });

    function findLoginId( name:String, regNumber:String) {
       mainApiService.pd_doFindLoginId(name,regNumber)
       .then(axiosResponse => {
          Util.showAlert("알림",axiosResponse.data.msg,null);
          if ( axiosResponse.data.fail ) {
            return;
          }
          state.loginId = axiosResponse.data.body.pd.loginId;
          state.isFind = true;
        });
    }


    return {
    checkAndFind,
    input,
    nameElRef,
    regNumberElRef,
    regNumber2ElRef,
    router,
    state,
    returnUpBackOutline
   }
  }
  
  
})
</script>

<style scoped>
input, ion-input {
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