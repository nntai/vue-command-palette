<template>
  <div class="result" ref="root">
    <div v-if="props.customerGroupCommands.length === 0">
      <no-result />
    </div>
    <div v-else v-for="(customerGroupCommand, index) in props.customerGroupCommands" :key="index" ref="groupRef">
      <div v-if="isDisplayByGroup" ref="groupNameRef" class="group-name">{{ customerGroupCommand.getGroupName() }}</div>
      <div v-for="(customerCommand, cmpIndex) in customerGroupCommand.getCommands()" :key="cmpIndex" ref="commandRef">
        <slot :commandKey="customerCommand.command.getCommandKey()" :commandName="customerCommand.command.getCommandName()" name="cmd-item">
        <div :class="{ 'cmp-list-is-active': isCommandActive(customerCommand.command.getCommandName()), 'cmp-list-item': true, }" @mouseover="() => { props.onGroupCommandHovered(index, cmpIndex); }" @click="() => { customerCommand.command.getCommandAction()(); props.closeModal(); }">
          
            <command-name :commandName="customerCommand.command.getCommandName()"
              :highlightArr="customerCommand.highlightArr" class="cmp-list-command cmp-list-left" />
      
          
            <div class="cmp-list-command cmp-list-right">
              <div class="key">{{ customerCommand.command.getCommandKey() }}</div>
            </div>
          
        </div>
        </slot>
        
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Command from "../models/command";
import GroupCommand from "../models/groupCommand";
import CommandName from "./CommandName.vue";
import NoResult from "./NoResult.vue";
import CommandPalette from "../CommandPalette.vue";
import scrollController from "../controllers/scrollController";
import { PropType } from "vue";

const props = defineProps({
  closeModal: {
    type: Function,
    default: function () {
      return "";
    },
  },
  isArrowUp: {
    type: Object,
    default: function () {
      return {};
    },
  },
  isArrowDown: {
    type: Object,
    default: function () {
      return {};
    },
  },
  /*GROUP COMMENT DECLARATION DO NOT TOUCH - HAO*/
  customerGroupCommands: {
    type: Array as PropType<GroupCommand[]>,
    default: function () {
      return [];
    },
  },
  customerGroupCommandName: {
    type: String,
    default: "",
  },
  onGroupCommandHovered: {
    type: Function,
    default: function () {
      return "";
    },
  },
  groupCommandIndex: {
    type: Object,
    default: function () {
      return {};
    },
  },
  isDisplayByGroup: {
    type: Boolean,
    default: false,
  },
});

const isCommandActive = (commandName: string) => {
  return commandName === props.customerGroupCommandName;
};

  const { root, groupRef, groupNameRef, commandRef } = scrollController(props.groupCommandIndex.groupCommandIndexValue, props.isArrowDown.isArrowDownValue, props.isArrowUp.isArrowUpValue);
</script>
<style scoped>
.result {
  overflow-y: scroll;
  max-height: 50vh;
}

.cmp-list-command {
  display: inline-block;
  width: 50%;
  height: 20px;
}

.cmp-list-left {
  text-align: left;

  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

.cmp-list-right {
  text-align: right;
}

.key {
  width: 63px;
  height: 16px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  color: var(--primary-color1);
  display: inline;
  text-transform: capitalize;
}

.cmp-list-is-active {
  box-sizing: border-box;
  border-radius: 4px;
  background-color:var(--primary-color)!important;
  color: white;
}

.cmp-list-item {
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  padding: 3% 2%;
  margin-bottom: 10px;
  background-color: var(--secondary-color-reverser);
  font-size: 15px;
  color: var(--text-color);
}

::-webkit-scrollbar {
  width: 0.5em;
}

::-webkit-scrollbar-thumb {
  background-color: var(--scroll-bar-color);
  border-radius: 5px;
}
.group-name {
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: 16px;
  color:var(--primary-color);
}
</style>
