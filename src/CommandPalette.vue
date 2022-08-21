<template>
  <div v-show="isModal" class='command-palette-place' :class="props.themeMode">
    <div class="command-palette-wrapper" v-click-outside="closeModal">
      <form @submit.prevent="onEnterKey">
        <cmp-input class="cmp-input" :customerText="customerInput" @update-text="updateText" :isModal="isModalOpened"/>
        <cmp-list-group class="cmp-list" :customerGroupCommands="customerGroupCommands" :customerGroupCommandName="customerGroupCommandName" :onGroupCommandHovered="updateCustomerGroupCommand" :closeModal="closeModal" :isArrowDown="isArrowDown" :isArrowUp="isArrowUp" :groupCommandIndex="groupCommandIndex" :isDisplayByGroup="isDisplayByGroup" >
          <template v-slot:cmd-name="{commandName}">
            <slot name="cmd-name" :commandName="commandName" />
          </template>
          <template v-slot:cmd-key="{commandKey}">
            <slot name="cmd-key" :commandKey="commandKey" />
          </template>
        </cmp-list-group>
        <cmp-footer class="cmp-footer" />
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import CmpInput from "./components/CmpInput.vue";
import CmpList from "./components/CmpList.vue";
import CmpFooter from "./components/CmpFooter.vue";
import keysController from "./controllers/keysController";

import customerInputController from "./controllers/customerInputController";

import customerCommandController from "./controllers/customerCommandController";

import modalController from "./controllers/modalController";

import { onMounted, computed, watch, ref } from "vue";

import { vClickOutside } from "./directives/vClickOutside";

import Command from "./models/command";

import GroupCommand from "./models/groupCommand";

import customerCommandGroupController from "./controllers/customerCommandGroupController";
import CmpListGroup from "./components/CmpListGroup.vue";
import lightweightFuzzy from "./places/lightweightFuzzy";
import "./style/style.css"
const props = defineProps({
  modalKey: {
    type: String,
    default: "Control+k",
  },
  customerCommandsByGroup: {
    type: Array,
    default: function(placeProps) {
      return [];
    }
  },
  isDisplayByGroup:{
    type: Boolean,
    default: false
  },
  themeMode:{
    type: Object,
    default:{
      dark: true,
      light: false
    }
  }
});
const { customerInput, clearText, isTextCleared } = customerInputController();
const { customerGroupCommands, customerGroupCommand, customerCommandGroupIndex, updateCustomerGroupCommand, previousCustomerGroupCommand, nextCustomerGroupCommand, commandGroupRefresh } = customerCommandGroupController(customerInput, props.customerCommandsByGroup, isTextCleared);
const { isModal, onModalChange, closeModal } = modalController(() => {  clearText(); commandGroupRefresh(); });
const onEnterKey = () => {
  let action: Function = () => {};
  action = customerGroupCommand.value.getCommandAction();
  action();
  closeModal();
};
const customerCommandName = computed(() => {
  return customerCommand.value.getCommandName();
});
const customerGroupCommandName = computed(() => {
  return customerGroupCommand.value.getCommandName();
});

lightweightFuzzy("place",props.customerCommandsByGroup);



const updateText = (value: string) => {customerInput.value = value;};
const keysInputController = keysController(onModalChange, props.modalKey, props.customerCommandsByGroup, previousCustomerGroupCommand, nextCustomerGroupCommand, onEnterKey);

const isModalOpened = computed(() => {
  return {isModalValue: isModal};
});
const isArrowDown = computed(() => {
  return {isArrowDownValue: keysInputController.isArrowDown};
});
const isArrowUp = computed(() => {
  return {isArrowUpValue: keysInputController.isArrowUp};
});
const commandIndex = computed(() => {
  return {commandIndexValue: customerCommandIndex};
});
const groupCommandIndex = computed(() => {
  return {groupCommandIndexValue: customerCommandGroupIndex};
});

</script>

<style scoped>
.command-palette-wrapper {
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color-reverse);
  width: 50%;
  padding: 8px;
  border-radius: 4px;
}
.command-palette-place {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 3%;
}
.cmp-input,
.cmp-list {
  flex: 1;
}
.cmp-input,
.cmp-list,
.cmp-footer {
  padding: 4% 3%;
  flex: 1;
}.cmp-input {
  background: var(--secondary-color-reverse-lighter);
  mix-blend-mode: normal;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
}
.cmp-input:hover{
  outline: none;
}
.cmp-list {
  padding: 0% 3%;
  margin-top: 10px;
}
</style>
