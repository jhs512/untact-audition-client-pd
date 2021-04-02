<template>
  <ion-content class="ion-padding">
    
    <ion-button :onclick="dismissModal">Close</ion-button>
    <ion-searchbar></ion-searchbar>
             <ion-item lines="none" button="true" v-bind:key="item" v-for="item in list.arr">
              <ion-label class="text-center">
                {{title}}
              </ion-label>
              <ion-checkbox></ion-checkbox>
            </ion-item>
  </ion-content>
</template>

<script lang="ts">
import { IonContent, IonItem, IonLabel, IonCheckbox, IonButton, IonSearchbar } from '@ionic/vue';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'SearchMovie',
  components: { IonContent, IonItem, IonLabel, IonCheckbox, IonButton, IonSearchbar },
  props:{
    title:{
      type:String
    },
    curmodal:{
      type: Object,
      required:true
    }
  },
  setup(props) {

    const list = reactive({
      arr: [
        {title:'1'},
        
      ]
    })

    function dismissModal() {
      props.curmodal.dismiss();
    }

    return {
      list,
      dismissModal
    }
  }
});
</script>

<style scoped>
</style>