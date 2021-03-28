<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="login-form flex flex-col relative min-h-screen mb-20">

    <TitleBar title="로그인 페이지">
      <div class="hisback absolute left-5" v-on:click="hisback"><ion-icon :icon="returnUpBackOutline"></ion-icon></div>
    </TitleBar>


    <div class=" w-60 mx-auto mt-8 flex flex-col">
      <form action="" v-on:submit.prevent="checkAndLogin">
        <FormRow title="이메일(아이디):">
          <input ref="emailElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>
        <FormRow title="PASSWORD:">
          <input type="hidden" ref="loginPwRealElRef">
          <input ref="loginPwElRef" type="password" class="p-1 w-full mt-2px">
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
import { defineComponent, getCurrentInstance, ref } from 'vue'
import { IonContent,  IonPage, IonIcon } from '@ionic/vue';
import { returnUpBackOutline } from 'ionicons/icons'
import { MainApi, useMainApi } from '../../apis'
import { sha256 } from 'js-sha256'

export default defineComponent({
  name: 'LoginPdPage',
  components: {
    IonContent,
    IonPage,
    IonIcon
  },
  props: {
    globalShare: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = useMainApi();

    const emailElRef = ref<HTMLInputElement>();
    const loginPwElRef = ref<HTMLInputElement>();
    const loginPwCfElRef = ref<HTMLInputElement>();
    const loginPwRealElRef = ref<HTMLInputElement>();
    

    function checkAndLogin() {
      // 이메일(아이디) 체크
      if ( emailElRef.value == null ) {
        return;
      }

      const emailEl = emailElRef.value;

      if ( emailEl.value.length == 0 ) {
        alert('이메일을 입력해 주세요.');
        emailEl.focus();
        return;
      }

      // 패스워드 체크
      if ( loginPwElRef.value == null ) {
        return;
      }

      const loginPwEl = loginPwElRef.value;

      if ( loginPwEl.value.length == 0 ) {
        alert('비밀번호를 입력해 주세요.');
        loginPwEl.focus();
        return;
      }

      const loginPwReal = loginPwRealElRef.value;
      
      if ( loginPwReal == null ){
        return;
      }

      loginPwReal.value = sha256(loginPwEl.value);
      
      login(emailEl.value, loginPwReal.value);
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


          props.globalShare.loginedMember = {
            authKey,
            id:loginedPd.id,
            name:loginedPd.name,
            address:loginedPd.address,
            email:loginedPd.email,
            cellPhoneNo:loginedPd.cellPhoneNo,
            jobPosition:loginedPd.jobPosition,
            corpName:loginedPd.corpName,
            corpType:loginedPd.corpType,
            profileImgUrl:loginedPd.extra__thumbImg
          };
          

         props.globalShare.member = axiosResponse.data.body.pd;

          router.replace('/main');
    
        });
    }
    function hisback() {
     router.back();
    }

    return {
    checkAndLogin,
    emailElRef,
    loginPwElRef,
    loginPwCfElRef,
    loginPwRealElRef,
    router,
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