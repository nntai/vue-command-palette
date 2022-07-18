<template>
  <div>
    Input Component
    <input type="text" :value="customerText" @input="(event) => {onInputChanged(event.target.value);}"/>
  </div>
</template>
<script setup lang="ts">
  
  
  
  const props = defineProps({
    customerText: {
      type: String,
      default: ""
    }
  });

  const emits = defineEmits(["updateText"]);
  const onInputChanged = (value: string) => {emits("updateText", value);};


</script>
<style lang="">

</style>
