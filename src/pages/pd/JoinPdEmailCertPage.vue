<template>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
import { Router } from 'vue-router';
import { globalShare, useGlobalShare } from '../../stores/';
import { MainApi, useMainApi } from '../../apis'

export default defineComponent({
  name: 'JoinPdEmailCertPage',
  setup() {
    const globalState = useGlobalShare();
    
    const mainApi:MainApi = useMainApi();
    localStorage.setItem("emailCert",globalState.fullPath.split("?")[1].split("=")[1]);
    localStorage.setItem("isEmailCert", "true");
    window.close();
      onMounted(() => {
        
       mainApi.pd_cert( globalState.fullPath.split("?")[1].split("=")[1])
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }
          
        });
      })

    return {
      
    }
  }
})
</script>
