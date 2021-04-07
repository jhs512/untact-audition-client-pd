<template>
  <ion-content class="ion-padding">
             <ion-item lines="none" button="true">
              <ion-label color="light" class="text-center">
                이것만은 꼭!
              </ion-label>
            </ion-item>

             <ion-item lines="none" button="true">
              <ion-label color="light" class="text-center">
                공지사항
              </ion-label>
            </ion-item>

             <ion-item lines="none" button="true">
              <ion-label color="light" class="text-center">
                문의사항
              </ion-label>
            </ion-item>

             <ion-item lines="none" button="true">
              <ion-label color="light" class="text-center">
                About Audictionary
              </ion-label>
            </ion-item>
  </ion-content>
</template>

<script>
import { IonContent, IonItem, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Popover',
  components: { IonContent, IonItem, IonLabel }
});
</script>

<style scoped>
ion-content{
  --background: #C85E5E;
}
ion-item {
  --background: #C85E5E;
}
ion-item::after{
  content:'';
  display:block;
  background-color:white;
  width:90%;
  height:1px;
  margin:0 auto;
}
</style>