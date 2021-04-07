<template>
  <div class="my-4 container flex items-center mx-auto">
      <div class="mx-auto w-full flex justify-center items-center relative">
        <div class="font-coda w-full text-center flex items-center justify-center h-14 text-xl">{{title}}</div>
        <div v-if="btn_back == 'true'" class="hisback absolute left-5">
            <ion-back-button default-href="/"></ion-back-button>
      </div>
        <div v-if="btn_menu == 'true'" class="btn-menu absolute right-2" @click="setOpen(true, $event)">
             <ion-button slots ="icon-only" fill="clear" color="dark" class="relative">
              <FontAweSomeIcon icon="bars"></FontAweSomeIcon>  
                <ion-popover mode="md" css-class="pop-over-style" :is-open="isOpenRef" :translucent="true" :onDidDismiss="setClose(false)">
                  <Popover></Popover>
                </ion-popover>
               </ion-button>
          </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonList, IonItemOptions, IonItemOption, IonItem, IonItemSliding, IonLabel, IonButton, IonButtons, IonBackButton, IonPopover } from '@ionic/vue'

import Popover from '../pages/main/popover.vue'
import '../pages/global.css'
import router  from '@/router'

export default defineComponent({
  props: {
    title: {
      type: String
    },
    btn_back:{
      type: String
    },
    btn_menu:{
      type: String
    }
  },
  components: {
    Popover, IonList, IonItemOptions, IonItemOption, IonItem, IonItemSliding, IonLabel, IonButton, IonButtons, IonBackButton, IonPopover
  },
  name: 'TitleBar',
  setup(){
    const isOpenRef = ref(false);
    
    const setOpen = (isOpened: boolean) => {
      isOpenRef.value = isOpened;
    }
    const setClose = ( isOpened: boolean) => {
      isOpenRef.value = isOpened;
    }


    return{
      isOpenRef,
      setOpen,
      setClose
    }
  }
})
</script>

<style scoped>

</style>