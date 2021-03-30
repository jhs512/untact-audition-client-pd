<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="flex flex-col relative min-h-screen mb-20">

    <TitleBar title="회원가입 페이지">
      <div class="hisback absolute left-5" v-on:click="hisback"><ion-icon :icon="returnUpBackOutline"></ion-icon></div>
    </TitleBar>

    <div class="w-60 mx-auto mt-8 flex flex-col flex-1">
      <form action="" v-on:submit.prevent="checkAndJoin">
        <FormRow title="이름:">
          <input ref="nameElRef" type="text" class="p-1 w-full mt-2">
        </FormRow>

        <FormRow title="주민등록번호:">
          <div class="flex w-full mt-2">
          <input type="text" ref="regNumberElRef" class="w-full text-center" maxlength="6">
          <span class="mx-1">-</span>
          <input type="text" ref="regNumber2ElRef" class="w-full text-center" maxlength="7">
          </div>
        </FormRow>

        <FormRow title="휴대폰:">
          <input ref="cellPhoneNoElRef" type="text" class="p-1 w-full mt-2">
        </FormRow>

        <FormRow title="이메일(아이디):">
          <input ref="emailElRef" type="text" class="p-1 w-full mt-2">
          <div class="btn-cert text-10px right-0 mr-1 px-3 absolute" v-on:click="emailCert">인증하기</div>
        </FormRow>
        <div class="text-10px">회원가입 확인 메일이 확인 가능한 메일로 작성해주세요</div>

        <FormRow title="주소:">
          <input ref="addressElRef" type="text" class="p-1 w-full mt-2px mt-2">
        </FormRow>

        <FormRow title="직급:">
          <input ref="jobPositionElRef" type="text" class="p-1 w-full mt-2">
        </FormRow>

        <FormRow title="PASSWORD:">
          <input type="hidden" ref="loginPwRealElRef">
          <input ref="loginPwElRef" type="password" class="p-1 w-full mt-2">
        </FormRow>

        <FormRow title="PASSWORD CONFIRM:">
          <input ref="loginPwCfElRef" type="password" class="p-1 w-full mt-2">
        </FormRow>
      <input type="submit" class="w-60 my-10 text-center btn-next text-xs text-white mx-auto p-2" value="완료">
      </form>
    </div>
    
    
  </div>

  </ion-content>
  </ion-page>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonPage, IonContent, IonIcon } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import router from '@/router';

import { MainApi, useMainApi } from '../../apis'

import { sha256 } from 'js-sha256'
export default defineComponent({
  name: 'JoinPdPage',
  components: {
    IonPage,
    IonContent,
    IonIcon
  },
  props:{

  },
  setup(props) {
    
    const mainApi:MainApi = useMainApi();

    const nameElRef = ref<HTMLInputElement>();
    const regNumberElRef = ref<HTMLInputElement>();
    const regNumber2ElRef = ref<HTMLInputElement>();
    const cellPhoneNoElRef = ref<HTMLInputElement>();
    const emailElRef = ref<HTMLInputElement>();
    const addressElRef = ref<HTMLInputElement>();
    const jobPositionElRef = ref<HTMLInputElement>();
    const loginPwElRef = ref<HTMLInputElement>();
    const loginPwCfElRef = ref<HTMLInputElement>();
    const loginPwRealElRef = ref<HTMLInputElement>();

    function emailCert() {
      const emailEl = emailElRef.value;
      
      if( emailEl == null ){
        alert("이메일을 입력해주세요.");
        return;
      }
      if( emailEl.value.length == 0 ){
        alert("이메일을 입력해주세요.");
        return;
      }

       mainApi.pd_emailDupCheck(emailEl.value)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }
          sendMail(emailEl.value);
        });
       

    }

    function sendMail(email:string){
      mainApi.pd_sendEmail(email)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }
          
        });
    }
    
    function checkAndJoin() {
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
      // 휴대폰 체크
      if ( cellPhoneNoElRef.value == null ) {
        return;
      }

      const cellPhoneNoEl = cellPhoneNoElRef.value;

      if ( cellPhoneNoEl.value.length == 0 ) {
        alert('휴대폰번호를 입력해 주세요.');
        cellPhoneNoEl.focus();
        return;
      }
      
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

      if ( localStorage.getItem("isEmailCert") != "true" ) {
        alert("이메일이 인증되지 않았습니다.");
        return;
      }
      if( localStorage.getItem("certEmail") != emailEl.value) {
        alert("인증된 이메일 주소가 아닙니다.");
        return;
      }

      // 주소 체크
      if ( addressElRef.value == null ) {
        return;
      }

      const addressEl = addressElRef.value;

      if ( addressEl.value.length == 0 ) {
        alert('주소를 입력해 주세요.');
        addressEl.focus();
        return;
      }

      // 직급 체크
      if ( jobPositionElRef.value == null ) {
        return;
      }

      const jobPositionEl = jobPositionElRef.value;

      if ( jobPositionEl.value.length == 0 ) {
        alert('직급을 입력해 주세요.');
        jobPositionEl.focus();
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
      
      // 패스워드 확인 체크
      if ( loginPwCfElRef.value == null ) {
        return;
      }

      const loginPwCfEl = loginPwCfElRef.value;
      
      if ( loginPwCfEl.value.length == 0 ) {
        alert('비밀번호 확인을 입력해 주세요.');
        loginPwCfEl.focus();
        return;
      }

      if( loginPwCfEl.value != loginPwEl.value ) {
        alert('비밀번호가 일치하지 않습니다.');
        loginPwCfEl.focus();
        return;
      }
      
      const loginPwReal = loginPwRealElRef.value;
      if ( loginPwReal == null ){
        return;
      }
      loginPwReal.value = sha256(loginPwEl.value);

      

      join(nameEl.value, regNumber, gender, cellPhoneNoEl.value, emailEl.value, addressEl.value, jobPositionEl.value, loginPwReal.value);
      
    }

    function join(name:String, regNumber:String, gender:String, cellPhoneNo:String, email:String, address:String, jobPosition:String, loginPw:String) {
       mainApi.pd_doJoin(name, regNumber, gender, cellPhoneNo, email, address, jobPosition, loginPw)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }
          localStorage.removeItem("isEmailCert");
          localStorage.removeItem("certEmail");
          router.replace('/');
    
        });
    }

    function hisback() {
     router.back();
    }
    return {
    emailCert,
    checkAndJoin,
    nameElRef,
    regNumberElRef,
    regNumber2ElRef,
    cellPhoneNoElRef,
    emailElRef,
    addressElRef,
    jobPositionElRef,
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
.btn-cert{
  background-color:#C4C4C4;
  top:58%;
  cursor:pointer;
}
.btn-next {
  background-color:#C4C4C4;
}
.regNumHidden{
  letter-spacing: 4px;
}
</style>