<template>
<ion-page>
  <ion-tabs>
    <ion-tab-bar color="light" slot="bottom" class="flex w-full mx-auto">

        <ion-tab-button tab="Home" href="/main/home">
          <ion-icon :icon="homeOutline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="SearchPage" href="/usr/recruit/search">
          <ion-icon :icon="searchOutline"></ion-icon>          
        </ion-tab-button>

        <ion-tab-button tab="MainPage" href="/usr/recruit/write">
          <ion-label>AD</ion-label>          
        </ion-tab-button>
      
        <ion-tab-button tab="info" :onclick="movePdInfo">
          <ion-icon :icon="personOutline"></ion-icon>
        </ion-tab-button>

      </ion-tab-bar>
  </ion-tabs>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { IonContent, IonPage, IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel, IonBadge } from '@ionic/vue'
import { calendar , personCircle, homeOutline, searchOutline, newspaperOutline, personOutline } from 'ionicons/icons'

import { useGlobalShare } from '@/stores'
export default defineComponent({
  name: 'BottomBar',
  props: {

  },
  components: {
    IonContent,  IonPage, IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel, IonBadge
  },
  setup(){
    const globalState = useGlobalShare();
    const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

    function movePdInfo(){
      router.replace("/usr/pd/info?id="+globalState.loginedMember.id);
    }

    return {
     globalState, calendar , personCircle, homeOutline, searchOutline, newspaperOutline, personOutline, movePdInfo
    }
  },
  
})
</script>

<style scoped>
.bottom-bar{
  border-top:1px solid black;
}
.bg-line{
  height:5px;
  width:100px;
  border-radius:10px;
  background-color:black;
}
.btn-search {
  width:70px;
  height:40px;
  border-radius:20px;
}
ion-tab-button{
  min-width:64px;
}
</style>