<template>
  <div class="mt-4 container flex items-center mx-auto">
      <div class="mx-auto w-full flex justify-center items-center relative">
        <div class="font-coda w-full text-center flex items-center justify-center h-14 text-xl">{{title}}</div>
        <slot></slot>
      </div>
    </div>
    
</template>

<script>
import { defineComponent } from 'vue'
import { IonList, IonItemOptions, IonItemOption, IonItem, IonItemSliding, IonLabel } from '@ionic/vue'
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
    IonList, IonItemOptions, IonItemOption, IonItem, IonItemSliding, IonLabel
  },
  name: 'TitleBar',
})
</script>

<style scoped>

</style>