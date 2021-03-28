<template>
  <div class="mt-2 relative">
          <div class="text-10px">{{title}}</div>
          <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    globalShare: {
      type: Object
    },
    title: {
      type: String
    }
  },
  name: 'FormRow',
})
</script>

<style scoped>
input {
  border:1px solid #D4D4D4;
}
.btn-cert{
  background-color:#C4C4C4;
}
</style>