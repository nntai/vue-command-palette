<template>
  <div class="cmp-input-place">
    <input type="text" :value="customerText" @input="(event) => {onInputChanged(event.target.value);}" class="input-place" ref="cmpInput"  />
  </div>
</template>
<script setup lang="ts">
  import { ref, watch, onMounted, onUpdated } from "vue";
  
  
  const props = defineProps({
    customerText: {
      type: String,
      default: ""
    },
    isModal: {
      type: Object,
      default: function() {
        return {};
      }
    },
  });

  const emits = defineEmits(["updateText"]);
  const onInputChanged = (value: string) => {emits("updateText", value);};
  
  
  
  const cmpInput = ref();



  watch(props.isModal.isModalValue, (value) => {
    if (value) {
      setTimeout(() => {cmpInput.value.focus();}, 0);
    }
  });


</script>
<style scoped>

  .input-place{
  display: flex;
  width: 100%;
  padding: 10px;
}
.input-place:focus{
  outline: none;
  box-shadow: none;
}
</style>
