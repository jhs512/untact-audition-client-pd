<template>
</template>

<script lang="ts">
import { useMainService } from '@/services';
import { useGlobalShare } from '@/stores';
import { defineComponent } from 'vue'
import * as Util from '@/utils'
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
    const mainApiService = useMainService();
    
    
     mainApiService.pd_emailCert(props.email,props.emailCertKey)
        .then(axiosResponse => {
          Util.showAlert("알림",axiosResponse.data.msg,  window.close());
          if ( axiosResponse.data.fail ) {
          
            return;
          }
          
        });
    
    return {
      
    }
  }
})
</script>
