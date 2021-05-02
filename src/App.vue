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