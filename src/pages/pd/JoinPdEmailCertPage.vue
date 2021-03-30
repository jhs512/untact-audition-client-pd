<template>
</template>

<script lang="ts">
import { useGlobalShare } from '@/stores';
import { defineComponent } from 'vue'

import { MainApi, useMainApi } from '../../apis'

export default defineComponent({
  name: 'JoinPdEmailCertPage',
  props:{
    email : {
      type: String,
      required: true
    },
    emailCertKey:{
      type:String,
      required:true
    }
  },
  setup(props) {
    const mainApi:MainApi = useMainApi();
    const globalState = useGlobalShare();
    
     mainApi.pd_emailCert(props.email,props.emailCertKey)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }
          localStorage.setItem("isEmailCert","true");
          localStorage.setItem("certEmail",props.email);
        });
    
    return {
      
    }
  }
})
</script>
