<template>
  <div class="cmp-input-place">
    Input Component
    <input
      type="text"
      :value="customerText"
      placeholder="Select a command or search..."
      class="input-place cmp-input-field"
      ref="cmpInput"
      @keydown.down="blurInput"
      @input="(event) => {onInputChanged(event.target.value);}"
    />
  </div>
</template>
<script setup lang="ts">
  import { ref, watch, onMounted } from "vue";


  const props = defineProps({
    customerText: {
      type: String,
      default: ""
    },
    isModal: {
      type: Boolean,
      default: function() {
        return {};
      }
    }
  });

  const emits = defineEmits(["updateText"]);
  const onInputChanged = (value: string) => {emits("updateText", value);};



  const cmpInput = ref();
  const blurInput = ref(() => {});

  onMounted(() => {
    blurInput.value = () => {cmpInput.value.blur();};
  });



  watch(props.isModal, (value) => {
    if (value) {
      setTimeout(() => {cmpInput.value.focus();}, 0);
    }
  });


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

.input-place {
  width: 70%;
  border: none;
  padding: 1% 1%;
  font-size: 15px;
}
</style>
