<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="login-form flex flex-col relative min-h-screen mb-20">

    <TitleBar title="비밀번호 재설정"></TitleBar>


    <div class=" w-60 mx-auto mt-8 flex flex-col">
      <form action="" v-on:submit.prevent="checkAndModify">
        <FormRow title="비밀번호:">
          <ion-input v-model="input.loginPwEl" ref="loginPwElRef" inputmode="password" type="password" class="w-full mt-2px"></ion-input>
        </FormRow>
        <FormRow title="비밀번호 확인:">
          <ion-input v-model="input.loginPwCfEl" inputmode="password" type="password" class="w-full mt-2px"></ion-input>
        </FormRow>
      <input type="submit" class="w-60 mt-10 text-center btn-next text-xs text-black mx-auto p-2" value="완료">
      </form>
    </div>

  </div>
  </ion-content>
</ion-page>

</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { IonPage, IonContent, IonIcon, IonInput } from '@ionic/vue'
import * as Util from '@/utils'

import { useMainService } from '@/services'
import { sha256 } from 'js-sha256'
export default defineComponent({
  name: 'FindLoginPwPdPage',
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonInput
  },
  props: {
    email:{
      type: String,
      required: true
    },
    emailKey:{
      type: String,
      required: true
    }
  },
  setup(props) {
    
    const mainApiService = useMainService();

    const input = reactive ({
      loginPwEl:'',
      loginPwCfEl:''
    })

    function checkAndModify(){
      // 비밀번호 체크
      if (input.loginPwEl == null){
        return;
      }

      if (input.loginPwEl.length == 0 ){
        alert('비밀번호를 입력해 주세요.');
        return;
      }
      if (input.loginPwCfEl.length ==0 ){
        alert('비밀번호 확인 칸을 입력해 주세요.');
        return;
      }

      if(input.loginPwEl != input.loginPwCfEl){
        alert('비밀번호가 맞지 않습니다.');
        return;
      }
      
      const loginPwReal = sha256(input.loginPwEl);

      modifyPw(props.email, props.emailKey, loginPwReal);

    }

    function modifyPw (email: string, key: string, loginPw: string) {
        mainApiService.pd_doModifyPw(email,key,loginPw)
        .then(axiosResponse => {
          if(axiosResponse.data.fail){
            Util.showAlert("알림",axiosResponse.data.msg,null);  
          } else {
            Util.showAlert("알림",axiosResponse.data.msg,() => location.replace('/usr/pd/login'));
          }
          
        }
      )}

    return {
      input,
      checkAndModify
   }
  },
  methods : {
    
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