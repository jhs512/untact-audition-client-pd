<template>
<ion-page>
  <ion-tabs>
    <ion-tab-bar color="light" slot="bottom" class="flex w-full mx-auto">

        <ion-tab-button tab="Home">
          <ion-button color="light" router-link="/main/home">
          <ion-icon :icon="homeOutline"></ion-icon>
          </ion-button>
        </ion-tab-button>

        <ion-tab-button tab="SearchPage">
          <ion-button color="light" router-link="/usr/recruit/search">
          <ion-icon :icon="searchOutline"></ion-icon>          
          </ion-button>
        </ion-tab-button>

        <ion-tab-button tab="MainPage">
          <ion-button color="light" router-link="/usr/recruit/write">
          <ion-label>AD</ion-label>          
          </ion-button>
        </ion-tab-button>
      
        <ion-tab-button tab="info">
          <ion-button color="light" :router-link="`/usr/pd/info?id=${globalState.loginedMember.id}`">
          <ion-icon :icon="personOutline"></ion-icon>
          </ion-button>
        </ion-tab-button>

      </ion-tab-bar>
  </ion-tabs>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { IonContent, IonPage, IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel, IonBadge, IonButton } from '@ionic/vue'
import { calendar , personCircle, homeOutline, searchOutline, newspaperOutline, personOutline } from 'ionicons/icons'

import { useGlobalShare } from '@/stores'
export default defineComponent({
  name: 'BottomBar',
  props: {

  },
  components: {
    IonContent,  IonPage, IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel, IonBadge, IonButton
  },
  setup(){
    const globalState = useGlobalShare();
    const router = getCurrentInstance()?.appContext.config.globalProperties.$router;

    return {
     globalState, calendar , personCircle, homeOutline, searchOutline, newspaperOutline, personOutline
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
ion-button{
  --border-width:0;
  --box-shadow:0;
}
</style>