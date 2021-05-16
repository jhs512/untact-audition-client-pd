<template>
</template>

<script lang="ts">
import { useMainService } from '@/services';
import { defineComponent } from 'vue'
import * as Util from '@/utils'

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
    const mainApiService = useMainService();
    
    
     mainApiService.pd_emailCert(props.email,props.emailCertKey)
        .then(axiosResponse => {
          
          if ( axiosResponse.data.fail ) {
          Util.showAlert("알림",axiosResponse.data.msg, () => window.close());
            return;
          }
          localStorage.setItem("isEmailCert","true");
          Util.showAlert("알림",axiosResponse.data.msg, () => window.close());
        });
    
    return {
      
    }
  }
})
</script>
