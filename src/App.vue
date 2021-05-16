<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, isPlatform, loadingController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Capacitor, Plugins, registerWebPlugin } from '@capacitor/core';
const { App } = Plugins;
import router from '@/router'
import { useMainService } from './services';
import * as Util from '@/utils'
import { register } from 'register-service-worker';

export default defineComponent({
  name: 'App',
  components:{
    IonApp,
    IonRouterOutlet
  },
  props: {
    globalShare: {
      type: Object
    }
  },
  setup(props) {

    const mainApiService = useMainService();

    // 앱링크 구현
    App.addListener('appUrlOpen', (data: any) => {
      // slug에 파라미터들이 들어감
      const slug = data.url.split("pd.audictionary.com")[1];

      // 카카오 로그인 주소로 앱이 켜지면 실행
      if(slug.startsWith("/usr/pd/kakaoLogin")){
        const codeStr = slug.split("code=")[1];
        router.push({ name: 'kakaoLogin' , params: {code: codeStr} });
      }

      // 회원가입 이메일 인증 주소로 앱이 켜지면 실행
      if(slug.startsWith("/usr/pd/emailCert")){
        const params = slug.split("email=")[1];
        const email = params.split("&key=")[0];
        const emailCertKey = params.split("&key=")[1];
         mainApiService.pd_emailCert(email, emailCertKey)
        .then(axiosResponse => {
          
          if ( axiosResponse.data.fail ) {
          Util.showAlert("알림",axiosResponse.data.msg, null);
            return;
          }
          localStorage.setItem("isEmailCert","true");
          Util.showAlert("알림",axiosResponse.data.msg, null);
        });
      }

      // 비밀번호 재설정 이메일 인증 주소로 앱이 켜지면 실행
      if(slug.startsWith('/usr/pd/modifyPw')){
        const params = slug.split("email=")[1];
        const emailStr = params.split("&key=")[0];
        const emailKeyStr = params.split("&key=")[1];
        router.push({ name: 'modifyPw' , params: {email: emailStr, emailKey: emailKeyStr} });
      }
    });
    
    return {
      router
    }
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Coda&family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;900&display=swap');
.font-roboto {
  font-family: 'Roboto', sans-serif;
}
.font-coda {
font-family: 'Coda', cursive;
}
.text-10px {
  font-size: 10px;
}
.mt-2px {
  margin-top:2px;
}
ion-button.color-red{
--background:#C85E5E;
}
ion-button.outline-red{
--background:white;
--border-color:#C85E5E;
--border-style:solid;
--border-width:2px;
--color:#C85E5E;
}
ion-button.ion-outline-black{
--background:white;
--border-color:black;
--border-style:solid;
--border-width:2px;
--color:black;
}

.bg-underline{
  border-bottom:1px solid rgba(0,0,0,0.3);
}
.seperate-line{
  height:1px;
  background:rgba(0,0,0,0.3);
  margin-top:20px;
  margin-bottom:20px;
}
</style>