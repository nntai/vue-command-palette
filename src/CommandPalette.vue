<template>
  <div v-show="isModal" class="command-palette-place">
    <div class="command-palette-wrapper" v-click-outside="closeModal">
      <form @submit.prevent="onEnterKey">
        <cmp-input class="cmp-input" :customerText="customerInput" @update-text="updateText" />
        <cmp-list class="cmp-list" :customerCommands="customerCommands" :customerCommandName="customerCommandName" :onCommandHovered="updateCustomerCommand"  :closeModal="closeModal" :searchPhrase="customerInput">
          <template v-slot:cmdName="{commandName}">
            <div>
              {{ commandName }}
            </div>
          </template>
          <template v-slot:cmdKey="{commandKey}">
          <div>
            {{ commandKey }}
          </div>
          </template>
        </cmp-list>
      </form>
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

import { vClickOutside } from "./directives/vClickOutside";

import Command from "./models/command";


const props = defineProps({
  modalKey: {
    type: String,
    default: "Control+k",
  },
  customerCommands: {
    type: Array,
    default: function(placeProps) {
      return [];
    }
  }
});

const { customerInput, clearText } = customerInputController();
const { customerCommands, customerCommand, updateCustomerCommand, previousCustomerCommand, nextCustomerCommand, commandRefresh } = customerCommandController(customerInput, props.customerCommands);
const { isModal, onModalChange, closeModal } = modalController(() => { commandRefresh(); clearText(); });
const onEnterKey = () => {
  let action: Function = () => {};
  action = customerCommand.value.getCommandAction();
  action();
  closeModal();
};
const customerCommandName = computed(() => {
  return customerCommand.value.getCommandName();
});




const updateText = (value: string) => {customerInput.value = value;};
const keysInputController = keysController(onModalChange, props.modalKey, props.customerCommands, previousCustomerCommand, nextCustomerCommand, onEnterKey);

</script>

<style scoped>
.command-palette-wrapper {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  padding: 8px;
  border-radius: 4px;
}
.command-palette-place {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.cmp-input,
.cmp-list {
  flex: 1;
}
.cmp-input {
  max-height: 50px;
  background: #FFFFFF;
  mix-blend-mode: normal;
  /* Gray/200 (Border-B2, Gray-G2, Light-L2)) */

  border: 1px solid #EDEDED;

 box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.04);

}
.cmp-input:hover{
  outline: none;

  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.04);
}
.cmp-list {
  margin-top: 10px;
}
</style>
