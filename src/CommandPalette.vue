<template>
  <div
    v-show="isModal"
    class="command-palette-place"
    :class="props.themeMode"
  >
    <div
      v-click-outside="closeModal"
      class="command-palette-wrapper"
    >
      <form @submit.prevent="onEnterKey">
        <cmp-input
          class="cmp-input"
          :customer-text="customerInput"
          :is-modal="isModalOpened"
          @update-text="updateText"
        />
        <cmp-list-group
          class="cmp-list"
          :customer-group-commands="customerGroupCommands"
          :customer-group-command-name="customerGroupCommandName"
          :on-group-command-hovered="updateCustomerGroupCommand"
          :close-modal="closeModal"
          :is-arrow-down="isArrowDown"
          :is-arrow-up="isArrowUp"
          :group-command-index="groupCommandIndex"
          :is-display-by-group="isDisplayByGroup"
        >
          <template #cmd-item="{commandName,commandKey}">
            <slot
              name="cmd-item"
              :command-name="commandName"
              :command-key="commandKey"
            />
          </template>
        </cmp-list-group>
        <cmp-footer class="cmp-footer" />
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import CmpInput from './components/CmpInput.vue';
import keysController from './controllers/keysController';
import customerInputController from './controllers/customerInputController';
import modalController from './controllers/modalController';
import { computed, PropType } from 'vue';
import { vClickOutside } from './directives/vClickOutside';
import customerCommandGroupController from './controllers/customerCommandGroupController';
import CmpFooter from './components/CmpFooter.vue';
import CmpListGroup from './components/CmpListGroup.vue';
import './index.css';

type CommandProp = {
  commandName: string, commandKey: string, commandAction: () => void,
}
type GroupCommandProp = {
  groupName: string,
  commands: CommandProp[]
}

const props = defineProps({
  customerGroups: {
    type: Array as PropType<GroupCommandProp[]>,
    default () {
      return [];
    },
  },
  modalKey: {
    type: String,
    default: 'Control+k',
  },
  // customerCommandsByGroup: {
  //   type: Array as PropType<GroupCommand[]>,
  //   default: function() {
  //     return [];
  //   }
  // },
  isDisplayByGroup: {
    type: Boolean,
    default: false,
  },
  themeMode: {
    type: Object,
    default: () => ({
      dark: true,
      light: false,
    }),
  },
});

const { customerInput, clearText, isTextCleared } = customerInputController();
const {
  customerGroupsBase,
  customerGroupCommands,
  customerGroupCommand,
  customerCommandGroupIndex,
  updateCustomerGroupCommand,
  previousCustomerGroupCommand,
  nextCustomerGroupCommand,
  commandGroupRefresh,
  getAllCommands,
} = customerCommandGroupController(customerInput, isTextCleared, props.customerGroups);

const onModalClosed = () => {
  clearText();
  commandGroupRefresh();
};

const onModalOpened = () => {
  isTextCleared.value = false;
  getAllCommands();
};
const { isModal, onModalChange, closeModal } = modalController(onModalClosed, onModalOpened);

const onEnterKey = () => {
  const action = customerGroupCommand.value.getCommandAction();
  action();
  closeModal();
};
const customerGroupCommandName = computed(() => {
  return customerGroupCommand.value.getCommandName();
});

const updateText = (value: string) => { customerInput.value = value; };
const keysInputController = keysController(
  onModalChange,
  props.modalKey,
  customerGroupsBase,
  previousCustomerGroupCommand,
  nextCustomerGroupCommand,
  onEnterKey,
);

const isModalOpened = computed(() => {
  return { isModalValue: isModal };
});
const isArrowDown = computed(() => {
  return { isArrowDownValue: keysInputController.isArrowDown };
});
const isArrowUp = computed(() => {
  return { isArrowUpValue: keysInputController.isArrowUp };
});
const groupCommandIndex = computed(() => {
  return { groupCommandIndexValue: customerCommandGroupIndex };
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
  padding: 5% 0% 0% 30%;
  background: rgba(0, 0, 0, 0.5)
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
