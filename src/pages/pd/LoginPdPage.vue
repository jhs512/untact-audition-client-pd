<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="login-form flex flex-col relative min-h-screen mb-20">

    <TitleBar title="로그인 페이지" btn_back="true"></TitleBar>


    <div class=" w-60 mx-auto mt-8 flex flex-col">
      <form action="" v-on:submit.prevent="checkAndLogin">
        <FormRow title="이메일(아이디):">
          <ion-input v-model="input.emailEl" ref="emailElRef" type="text" placeholder="아이디" autofocus="true" clear-input="true" required="true" enterkeyhint="next"></ion-input>
        </FormRow>
        <FormRow title="PASSWORD:">
          <ion-input v-model="input.loginPwEl" ref="loginPwElRef" type="password" clear-input="true" required="true" placeholder="비밀번호" enterkeyhint="done"></ion-input>
        </FormRow>
        <router-link to="/usr/pd/findSelect"><span class="text-10px">아이디 혹은 비밀번호가 기억나지 않으시나요?</span></router-link>
      <input type="submit" class="w-60 mt-10 text-center btn-next text-xs text-black mx-auto p-2" value="LOGIN">
      </form>
    </div>
    
    <router-link to="/usr/member/joinTos" class="mx-auto mt-4"><div class="text-xs">아이디가 없으신가요?</div></router-link>

    <div class="flex w-60 items-center mx-auto mt-6">
      <div class="bg-line-sep w-full"></div>
    <div class="font-coda mx-4">OR</div>
    <div class="bg-line-sep w-full"></div>
    </div>
  </div>
</ion-content>
</ion-page>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { IonContent,  IonPage, IonIcon, IonInput } from '@ionic/vue';
import { returnUpBackOutline } from 'ionicons/icons'
import { MainApi, useMainApi } from '../../apis'
import { sha256 } from 'js-sha256'
import { useGlobalShare } from '@/stores';
import router from '@/router'

export default defineComponent({
  name: 'LoginPdPage',
  components: {
    IonContent,
    IonPage,
    IonIcon,
    IonInput
  },
  props:{
    
  },
  setup(props) {
    
    const globalState = useGlobalShare();
    
    const mainApi:MainApi = useMainApi();

    const emailElRef = ref<HTMLIonInputElement>();
    const loginPwElRef = ref<HTMLIonInputElement>();
    
    const input = reactive({
      emailEl:'',
      loginPwEl:''
    })

    function checkAndLogin() {
      // 이메일(아이디) 체크
      if ( input.emailEl.length == 0 ) {
        alert('이메일을 입력해 주세요.');
        emailElRef.value?.focus();
        return;
      }

      // 패스워드 체크
      if ( loginPwElRef.value == null ) {
        return;
      }

      const loginPwEl = loginPwElRef.value;

      if ( input.loginPwEl.length == 0 ) {
        alert('비밀번호를 입력해 주세요.');
        loginPwEl.focus();
        return;
      }

      const loginPwReal = sha256(input.loginPwEl);
      
      login( input.emailEl, loginPwReal);
    }

    function login( email:String,loginPw:String) {
       mainApi.pd_doLogin( email, loginPw )
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }

          const authKey = axiosResponse.data.body.authKey;
          const loginedPd = axiosResponse.data.body.pd;
          
          localStorage.setItem("authKey", authKey);
          localStorage.setItem("loginedMemberId", loginedPd.id + "");
          localStorage.setItem("loginedMemberName", loginedPd.name);
          localStorage.setItem("loginedMemberEmail", loginedPd.email);
          localStorage.setItem("loginedMemberCellPhoneNo", loginedPd.cellPhoneNo);
          localStorage.setItem("loginedMemberAddress", loginedPd.address);
          localStorage.setItem("loginedMemberJobPosition", loginedPd.jobPosition);
          localStorage.setItem("loginedMemberCorpName", loginedPd.corpName);
          localStorage.setItem("loginedMemberCorpType", loginedPd.corpType);
          localStorage.setItem("loginedMemberProfileImgUrl", loginedPd.extra__thumbImg);
          
          location.replace('/main');
    
        });
    }
    function hisback() {
     router.back();
    }

    return {
    checkAndLogin,
    emailElRef,
    loginPwElRef,
    router,
    hisback,
    returnUpBackOutline,
    input
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