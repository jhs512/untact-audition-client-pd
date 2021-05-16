<template>
<ion-page>
  <ion-content :fullscreen="true">
    <div class="login-form flex flex-col relative min-h-screen mb-20">

      <TitleBar title="로그인 아이디 찾기 페이지" btn_back="true"></TitleBar>

      <div v-if="state.isFound == false" class=" w-60 mx-auto mt-8 flex flex-col">
        <form action="" v-on:submit.prevent="checkAndFind">
          <FormRow title="이름:">
            <ion-input v-model="input.nameEl" ref="nameElRef" type="text" class="w-full mt-2px"></ion-input>
          </FormRow>
          <FormRow title="주민등록번호:">
            <div class="flex items-center w-full mt-2">
                <ion-input class="flex-1" v-model="input.regNumber1El" type="text" ref="regNumber1ElRef" maxlength="6" inputmode="decimal" placeholder="앞 6자리" clear-input="true" required="true" enterkeyhint="next"></ion-input>
                <span class="mx-2">-</span>
                <div class="flex  items-center flex-1">
                  <div class="w-10">
                    <ion-input v-model="input.regNumber2El" type="text" ref="regNumber2ElRef" maxlength="1" inputmode="decimal" placeholder="뒤 1자리" required="true" enterkeyhint="next"></ion-input>
                  </div>
                  <span class="flex-1 flex justify-around">
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                  </span>
                </div>
              </div>
          </FormRow>
          <input type="submit" class="w-60 mt-10 text-center btn-next text-xs text-black mx-auto p-2" value="FIND">
        </form>
      </div>

      <div v-if="state.isFound" class="w-60 mx-auto mt-8 text-center flex flex-col">
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
import { useMainService } from '@/services'

export default defineComponent({
  name: 'FindLoginIdPdPage',
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonInput
  },
  setup() {
    
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
     
      const regNumberEl = input.regNumber1El + input.regNumber2El;  

      findLoginId(input.nameEl, regNumberEl);
    }
    
    const state = reactive({
      loginId: '',
      isFound: false
    });

    function findLoginId( name: string, regNumber: string) {
       mainApiService.pd_doFindLoginId(name,regNumber)
       .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            Util.showAlert("알림",axiosResponse.data.msg,null);
            return;
          }
          state.loginId = axiosResponse.data.body.pd.loginId;
          state.isFound = true;
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