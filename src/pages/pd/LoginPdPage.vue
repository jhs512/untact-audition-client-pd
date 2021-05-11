<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="login-form flex flex-col relative min-h-screen mb-20">

    <TitleBar title="로그인 페이지" btn_back="true"></TitleBar>


    <div class="mx-14 mt-8 flex flex-col">
      <form action="" v-on:submit.prevent="checkAndLogin">
        <FormRow title="이메일(아이디):">
          <ion-input v-model="input.emailEl" ref="emailElRef" inputmode="email" type="text" placeholder="아이디" autofocus="true" clear-input="true" required="true" enterkeyhint="next"></ion-input>
        </FormRow>
        <FormRow title="PASSWORD:">
          <ion-input v-model="input.loginPwEl" ref="loginPwElRef" type="password" clear-input="true" required="true" placeholder="비밀번호" enterkeyhint="done"></ion-input>
        </FormRow>
        <router-link to="/usr/pd/findSelect"><span class="text-10px">아이디 혹은 비밀번호가 기억나지 않으시나요?</span></router-link>
      <input type="submit" class="w-full mt-14 text-center btn-next text-xs text-black mx-auto p-2" value="LOGIN">
      </form>
    </div>
    
    <router-link to="/usr/pd/joinTos" class="mx-auto mt-4"><div class="text-xs">아이디가 없으신가요?</div></router-link>

    <div class="flex w-60 items-center mx-auto mt-6">
      <div class="bg-line-sep w-full"></div>
    <div class="font-coda mx-4">OR</div>
    <div class="bg-line-sep w-full"></div>
    </div>

    <div class="mx-auto mt-8">
      <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=5b941d4fab193384e4d45ed6723fb973&redirect_uri=https://pd.audictionary.com/usr/pd/kakaoLogin">
        <img src="/gen/kakao_login_medium_wide.png" alt="">
      </a>
    </div>

  </div>
</ion-content>
</ion-page>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { IonContent,  IonPage, IonIcon, IonInput } from '@ionic/vue';
import { returnUpBackOutline } from 'ionicons/icons'
import * as Util from '@/utils'
import { sha256 } from 'js-sha256'
import { useGlobalShare } from '@/stores';
import router from '@/router'
import { useMainService } from '@/services';


export default defineComponent({
  name: 'LoginPdPage',
  components: {
    IonContent,
    IonPage,
    IonIcon,
    IonInput
  },
  props:{
    id: {
      type: String,
      required: true
    }
  },
  setup(props) { 
    const globalState = useGlobalShare();
    
    const mainApiService = useMainService();

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

    function login( email: string,loginPw: string) {
       mainApiService.pd_doLogin( email, loginPw )
        .then(axiosResponse => {
          
          if ( axiosResponse.data.fail ) {
            Util.showAlert("알림",axiosResponse.data.msg, null);
            return;
          }
          
          const authKey = axiosResponse.data.body.authKey;
          const loginedPd = axiosResponse.data.body.pd;
          
          localStorage.setItem("authKey", authKey);
          localStorage.setItem("loginedMemberId", loginedPd.id + "");
          localStorage.setItem("loginedMemberType", "pd");
          localStorage.setItem("loginedMemberName", loginedPd.name);
          localStorage.setItem("loginedMemberEmail", loginedPd.email);
          localStorage.setItem("loginedMemberCellPhoneNo", loginedPd.cellPhoneNo);
          localStorage.setItem("loginedMemberAddress", loginedPd.address);
          localStorage.setItem("loginedMemberJobPosition", loginedPd.jobPosition);
          localStorage.setItem("loginedMemberCorpName", loginedPd.corpName);
          localStorage.setItem("loginedMemberCorpType", loginedPd.corpType);
          localStorage.setItem("loginedMemberExtra__thumbImg", loginedPd.extra__thumbImg);

          Util.showAlert("알림", axiosResponse.data.msg, () => location.replace('/main/home'));
    
        });
    }

    
    return {
    checkAndLogin,
    emailElRef,
    loginPwElRef,
    router,
    returnUpBackOutline,
    input,
    props
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