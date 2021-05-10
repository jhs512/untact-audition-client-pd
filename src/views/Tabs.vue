<template>
<ion-tabs>
    <ion-tab-bar color="light" class="flex w-full mx-auto">

        <ion-tab-button  tab="home" href="/">
          <ion-icon :icon="homeOutline"></ion-icon>
        </ion-tab-button>


        <ion-tab-button tab="search" href="">
          <ion-icon :icon="searchOutline"></ion-icon>          
        </ion-tab-button>


        <ion-tab-button tab="ad" href="/">
          <ion-label>AD</ion-label>          
        </ion-tab-button>


        <ion-tab-button tab="feed" href="">
          <ion-icon :icon="newspaperOutline"></ion-icon>  
        </ion-tab-button>

      
        <ion-tab-button tab="usr" href="/usr/pd/info">
          <ion-icon :icon="personOutline"></ion-icon>
        </ion-tab-button>
      

      </ion-tab-bar>
</ion-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { IonContent, IonHeader, IonPage, IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel } from '@ionic/vue'
import { calendar , personCircle, homeOutline, searchOutline, newspaperOutline, personOutline } from 'ionicons/icons'
export default defineComponent({
  props: {
    globalShare: {
      type: Object
    },
    title: {
      type: String
    }
  },
  components: {
    IonContent, IonHeader, IonPage, IonTabs, IonTabBar, IonIcon, IonTabButton, IonLabel
  },
  setup(){
    return {
      calendar , personCircle, homeOutline, searchOutline, newspaperOutline, personOutline
    }
  },
  name: 'BottomBar',
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