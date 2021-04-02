<template>
  <ion-refresher slot="fixed" @ionRefresh="doRefresh()">
        <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { IonRefresher, IonRefresherContent } from '@ionic/vue';

export default defineComponent ({
  name:'IonRefresherC',
  components:{
    IonRefresher,
    IonRefresherContent
  },
  setup() {

     const doRefresh = () => {
        window.location.reload();
    }

    return {
        doRefresh
    }
  }

})
</script>

<style>

</style>