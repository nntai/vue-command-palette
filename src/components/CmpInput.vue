<template>
  <div>
    <input class="cmp-input-field" placeholder="Select a command or search..." type="text" :value="customerText" @input="(event) => {onInputChanged(event.target.value);}"/>
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
<style scoped>
.cmp-input-field{
  display: flex;
  width: 100%;
  padding: 10px;
}
.cmp-input-field:focus{
  outline: none;
  box-shadow: none;
}

</style>
