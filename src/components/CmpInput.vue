<template>
  <div>
    Input Component
    <input type="text" v-model="props.inputText.customerInput.value" />
  </div>
</template>
<script setup lang="ts">

  import {ref} from "vue";
  
  const props = defineProps({
    inputText: {
      type: Object,
      default: function(placeProps) {
        return {
          customerInput: ref("")
        };
      }
    }
  });


  
</script>
<style lang="">

</style>
