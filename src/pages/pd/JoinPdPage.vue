<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="flex flex-col relative min-h-screen mb-20">

    <TitleBar title="회원가입 페이지" btn_back="true"></TitleBar>

    <div class="w-60 mx-auto mt-8 flex flex-col flex-1">
      <form action="" v-on:submit.prevent="checkAndJoin">
        <FormRow title="이름:">
          <ion-input v-model="input.nameEl" ref="nameElRef" type="text" placeholder="이름" autofocus="true" clear-input="true" required="true" enterkeyhint="next"></ion-input>
        </FormRow>

        <FormRow title="주민등록번호:">
          <div class="flex items-center w-full mt-2">
          <ion-input v-model="input.regNumber1El" type="text" ref="regNumber1ElRef" maxlength="6" inputmode="decimal" placeholder="앞 6자리" clear-input="true" required="true" enterkeyhint="next"></ion-input>
          <span class="mx-1">-</span>
          <ion-input v-model="input.regNumber2El" type="text" ref="regNumber2ElRef" maxlength="7" inputmode="decimal" placeholder="뒤 7자리" clear-input="true" required="true" enterkeyhint="next"></ion-input>
          </div>
        </FormRow>

        <FormRow title="휴대폰:">
          <ion-input v-model="input.cellPhoneNoEl" ref="cellPhoneNoElRef" type="text" inputmode="decimal" placeholder="전화번호" clear-input="true" required="true" enterkeyhint="next"></ion-input>
        </FormRow>

        <FormRow title="이메일(아이디):">
          <ion-input v-model="input.emailEl" ref="emailElRef" type="text" inputmode="email" placeholder="이메일(아이디)" clear-input="true" required="true" enterkeyhint="next"></ion-input>
          <div class="btn-cert text-10px top-full right-0 px-3 py-1 mt-1 absolute z-50" v-on:click="emailCert">인증하기</div>
        </FormRow>
        <div class="text-10px"></div>

        <FormRow class="mt-7" title="주소:">
          <ion-input v-model="input.addressEl" ref="addressElRef" type="text" placeholder="주소" clear-input="true" required="true" enterkeyhint="next"></ion-input>
        </FormRow>

        <FormRow title="직급:">
          <ion-input v-model="input.jobPositionEl" ref="jobPositionElRef" type="text" placeholder="직급" clear-input="true" required="true" enterkeyhint="next"></ion-input>
        </FormRow>

        <FormRow title="PASSWORD:">
          <ion-input v-model="input.loginPwEl" ref="loginPwElRef" type="password" placeholder="비밀번호" clear-input="true" required="true" enterkeyhint="next"></ion-input>
        </FormRow>

        <FormRow title="PASSWORD CONFIRM:">
          <ion-input v-model="input.loginPwCfEl" ref="loginPwCfElRef" type="password" placeholder="비밀번호 확인" clear-input="true" required="true" enterkeyhint="done"></ion-input>
        </FormRow>
      <input type="submit" class="w-60 my-10 text-center btn-next text-xs text-white mx-auto p-2" value="완료">
      </form>
    </div>
    
    
  </div>

  </ion-content>
  </ion-page>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { IonPage, IonContent, IonIcon, IonInput } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import router from '@/router';
import * as Util from '@/utils'
import * as Crypto from 'crypto-ts'
import { sha256 } from 'js-sha256'
import { useMainService } from '@/services';
export default defineComponent({
  name: 'JoinPdPage',
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonInput
  },
  props:{

  },
  setup(props) {
    
    const mainApiService = useMainService();

    const nameElRef = ref<HTMLIonInputElement>();
    const regNumber1ElRef = ref<HTMLIonInputElement>();
    const regNumber2ElRef = ref<HTMLIonInputElement>();
    const cellPhoneNoElRef = ref<HTMLInputElement>();
    const emailElRef = ref<HTMLIonInputElement>();
    const addressElRef = ref<HTMLIonInputElement>();
    const jobPositionElRef = ref<HTMLIonInputElement>();
    const loginPwElRef = ref<HTMLIonInputElement>();
    const loginPwCfElRef = ref<HTMLIonInputElement>();

    const input = reactive({
      nameEl:'',
      regNumber1El:'',
      regNumber2El:'',
      cellPhoneNoEl:'',
      emailEl:'',
      addressEl:'',
      jobPositionEl:'',
      loginPwEl:'',
      loginPwCfEl:''
    })

    
    function emailCert() {
      if( input.emailEl == null ){
        alert("이메일을 입력해주세요.");
        emailElRef.value?.focus();
        return;
      }
      if( input.emailEl.length == 0 ){
        alert("이메일을 입력해주세요.");
        emailElRef.value?.focus();
        return;
      }

       mainApiService.pd_emailDupCheck(input.emailEl)
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
          Util.showAlert("알림",axiosResponse.data.msg,null);
            return;
          }
          sendMail(input.emailEl);
        });
       

    }

    function sendMail(email:string){
      mainApiService.pd_sendEmail(email)
        .then(axiosResponse => {
          Util.showAlert("알림",axiosResponse.data.msg,null);
          if ( axiosResponse.data.fail ) {
            return;
          }
          
          
        });
    }

    let isEmailCert = false;
    
    function checkAndJoin() {
      // 이름 체크
      if ( input.nameEl.length == 0 ) {
        alert('이름을 입력해 주세요.');
        nameElRef.value?.focus();
        return;
      }

      // 주민등록번호 체크
      if ( input.regNumber1El == null ) {
        return;
      }

      if ( input.regNumber1El.length == 0 ) {
        alert('주민등록번호를 제대로 입력해 주세요.');
        regNumber1ElRef.value?.focus();
        return;
      }

      if ( input.regNumber2El.length == 0 ) {
        alert('주민등록번호를 입력해 주세요.');
        regNumber2ElRef.value?.focus();
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

      // 휴대폰 체크
      if ( cellPhoneNoElRef.value == null ) {
        return;
      }
      if ( input.cellPhoneNoEl.length == 0 ) {
        alert('휴대폰번호를 입력해 주세요.');
        cellPhoneNoElRef.value.focus();
        return;
      }
      
      // 이메일(아이디) 체크
      if ( input.emailEl.length == 0 ) {
        alert('이메일을 입력해 주세요.');
        emailElRef.value?.focus();
        return;
      }

      
       mainApiService.pd_checkEmailCertificated(input.emailEl)
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
          Util.showAlert("알림",axiosResponse.data.msg,null);
            return;
          }
          isEmailCert = true;  
        });


      // 주소 체크
      if ( addressElRef.value == null ) {
        return;
      }

      if ( input.addressEl.length == 0 ) {
        alert('주소를 입력해 주세요.');
        addressElRef.value.focus();
        return;
      }

      // 직급 체크
      if ( jobPositionElRef.value == null ) {
        return;
      }

      if ( input.jobPositionEl.length == 0 ) {
        alert('직급을 입력해 주세요.');
        jobPositionElRef.value.focus();
        return;
      }

      // 패스워드 체크
      if ( loginPwElRef.value == null ) {
        return;
      }

      if ( input.loginPwEl.length == 0 ) {
        alert('비밀번호를 입력해 주세요.');
        loginPwElRef.value.focus();
        return;
      }
      
      // 패스워드 확인 체크
      if ( loginPwCfElRef.value == null ) {
        return;
      }

      if ( input.loginPwCfEl.length == 0 ) {
        alert('비밀번호 확인을 입력해 주세요.');
        loginPwCfElRef.value.focus();
        return;
      }

      if( input.loginPwCfEl != input.loginPwEl ) {
        alert('비밀번호가 일치하지 않습니다.');
        loginPwCfElRef.value.focus();
        return;
      }
      
      const loginPwRealEl = sha256(input.loginPwEl);

      

      join(input.nameEl, regNumber.toString() , gender, input.cellPhoneNoEl , input.emailEl, input.addressEl, input.jobPositionEl, loginPwRealEl );
      
    }

    function join(name:String, regNumber:String, gender:String, cellPhoneNo:String, email:String, address:String, jobPosition:String, loginPw:String) {
       mainApiService.pd_doJoin(name, regNumber, gender, cellPhoneNo, email, address, jobPosition, loginPw)
        .then(axiosResponse => {

          if ( axiosResponse.data.fail ) {
            Util.showAlert("알림",axiosResponse.data.msg, null);
            return;
          }
          
          localStorage.removeItem("isEmailCert");
          localStorage.removeItem("certEmail");
          
          Util.showAlert("알림",axiosResponse.data.msg,() => location.replace('/usr/pd/login'));
        });
    }

    function hisback() {
     router.back();
    }
    return {
    input,
    emailCert,
    checkAndJoin,
    nameElRef,
    regNumber1ElRef,
    regNumber2ElRef,
    cellPhoneNoElRef,
    emailElRef,
    addressElRef,
    jobPositionElRef,
    loginPwElRef,
    loginPwCfElRef,
    router,
    hisback,
    returnUpBackOutline
   }
  }
})
</script>

<style scoped>
input, ion-input {
  border:2px solid #D4D4D4;
}
.btn-cert{
  background-color:#C4C4C4;
  cursor:pointer;
}
.btn-next {
  background-color:#C4C4C4;
}

</style>