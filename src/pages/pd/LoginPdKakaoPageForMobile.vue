<template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent,  IonPage, IonIcon, IonInput } from '@ionic/vue';
import * as Util from '@/utils'
import '@/main.ts'
import { useMainService } from '@/services';

export default defineComponent({
  name: 'LoginPdKakaoPageForMobile',
  components: {
    IonContent,
    IonPage,
    IonIcon,
    IonInput
  },
  props:{
    code:{
      type: String,
      required: true
    }
  },
  setup(props) {
    const mainApiService = useMainService();
    
    mainApiService.pd_doKakaoLogin(props.code)
    .then(axiosResponse => {
          if(axiosResponse.data.fail){
            Util.showAlert("알림", axiosResponse.data.msg, () => location.replace('/usr/pd/login'));  
            return;
          }

          const authKey = axiosResponse.data.body.authKey;
          const loginedPd = axiosResponse.data.body.pd;
          
          localStorage.setItem("isLoginedByKakao", "true");
          localStorage.setItem("loginedMemberType", "kakao");
          localStorage.setItem("authKey", authKey);
          
          localStorage.setItem("loginedMemberId", loginedPd.id + "");
          if(loginedPd.name != null){
            localStorage.setItem("loginedMemberName", loginedPd.name);
          }
          
          if(loginedPd.email != null){
            localStorage.setItem("loginedMemberEmail", loginedPd.email);
          }
          var thumbUrl = '';
          
          if(loginedPd.extra != null && loginedPd.extra.thumbnail_image_url != null){
            thumbUrl = loginedPd.extra.thumbnail_image_url;
            if(thumbUrl != null){
            thumbUrl = thumbUrl?.replace("http","https");
            localStorage.setItem("loginedMemberExtra__thumbImg", thumbUrl);
          }
          }
          
          location.replace('/main/home');

    })

    return {

   }
  }
  
  
})
</script>

<style scoped>
</style>