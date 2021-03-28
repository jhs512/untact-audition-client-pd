<template>

  <ion-app>
    <ion-router-outlet />
  </ion-app>

  
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
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
   
    
    return {
      
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
</style>