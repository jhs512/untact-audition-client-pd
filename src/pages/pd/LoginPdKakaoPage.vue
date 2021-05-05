<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="login-form flex flex-col relative min-h-screen mb-20">
    
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
import { mainServiceSymbol, useMainService } from '@/services';
import axios from 'axios';


export default defineComponent({
  name: 'LoginPdKakaoPage',
  components: {
    IonContent,
    IonPage,
    IonIcon,
    IonInput
  },
  props:{
    code:{
      type: String,
      required:true
    }
  },
  setup(props) {
    const mainApiService = useMainService();

    mainApiService.pd_doKakaoLogin(props.code)
    .then(axiosResponse => {


          const authKey = axiosResponse.data.body.authKey;
          const loginedPd = axiosResponse.data.body.pd;

          localStorage.setItem("isLoginedByKakao", "true");
          localStorage.setItem("loginedMemberType", "kakao");
          localStorage.setItem("authKey", authKey);
          
          localStorage.setItem("loginedMemberId", loginedPd.id + "");
          localStorage.setItem("loginedMemberName", loginedPd.name);
          localStorage.setItem("loginedMemberEmail", loginedPd.email);
          
          localStorage.setItem("loginedMemberExtra__thumbImg", loginedPd.extra.thumbnail_image_url);

          Util.showAlert("알림", axiosResponse.data.msg, () => location.replace('/main/home'));

    })

    return {

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