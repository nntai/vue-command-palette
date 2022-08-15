<template>
  <div class="cmp-input-place">
    <div class="search-icon"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></div>
    <input type="text" :value="customerText" @input="(event) => {onInputChanged(event.target.value);}" class="input-place" ref="cmpInput" placeholder="Select a command ..."  />
  </div>
</template>
<script setup lang="ts">
  import { ref, watch, onMounted, onUpdated} from "vue";
  import FontAwesomeIcon from "../icons/fontAwesomeIcon";
  import { defineComponent } from "vue";

  
  
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


  defineComponent({
    FontAwesomeIcon
  });
</script>
<style scoped>
  .cmp-input-place {
    border: 1px solid black;
    display: inline-block;
    width: 100%;
  }
  .search-icon{
    display: inline;
    width: 10%;
    padding: 10px;
    color:#7AE1AA;
    font-size: 20px;
  }
  .input-place{
  width: 85%;
  padding: 10px;
  outline: none;
  border:none;
}
input{
  font-family: 'Open Sans';
  font-size: 20px;
}
.input-place:focus{
  outline: none;
  box-shadow: none;
}
</style>
