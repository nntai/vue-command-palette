<template>
  <div v-show="customerModalController.isModal.value" class="command-pallete-place">
    <div class="command-pallete-wrapper" v-click-outside="customerModalController.closeModal">
      <cmp-input class="cmp-input" v-bind:inputText="textInputController" />
      <cmp-list class="cmp-list" v-bind:customerCommands="commandsController.customerCommands.value" />
    </div>
  </div>
</template>
<script setup lang="ts">
import CmpInput from "./components/CmpInput.vue";
import CmpList from "./components/CmpList.vue";

import keysController from "./controllers/keysController";

import customerInputController from "./controllers/customerInputController";

import customerCommandController from "./controllers/customerCommandController";

import modalController from "./controllers/modalController";

import { onMounted, computed, watch, ref } from "vue";

import {vClickOutside} from "./directives/vClickOutside";


const props = defineProps({
  modalKey: {
    type: String,
    default: "Control+k",
  },
  customerCommands: {
    type: Object,
    default: function(placeProps) {
      return [];
    }
  }
});

const customerModalController = modalController();
const keysInputController = keysController(customerModalController.onModalChange, props.modalKey);
const textInputController = customerInputController();
const commandsController = customerCommandController(textInputController.customerInput, props.customerCommands);
</script>
<style scoped>
.command-pallete-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 25%;
}
.command-pallete-place {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.cmp-input,
.cmp-list {
  flex: 1;
  border: 1px solid gray;
}
.cmp-input {
  max-height: 50px;
}
.cmp-list {
  margin-top: 10px;
}
</style>
