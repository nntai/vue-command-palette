<template>
  <div
    ref="root"
    class="result"
  >
    <div v-if="customerGroupCommands.length === 0">
      <no-result />
    </div>
    <div
      v-for="(customerGroupCommand, index) in customerGroupCommands"
      v-else
      :key="index"
      ref="groupRef"
    >
      <div
        v-if="isDisplayByGroup"
        ref="groupNameRef"
        class="group-name"
      >
        {{ customerGroupCommand.getGroupName() }}
      </div>
      <div
        v-for="(customerCommand, cmpIndex) in customerGroupCommand.getCommands()"
        :key="cmpIndex"
        ref="commandRef"
      >
        <slot
          :command-key="customerCommand.command.getCommandKey()"
          :command-name="customerCommand.command.getCommandName()"
          name="cmd-item"
        >
          <div
            :class="{ 'cmp-list-is-active': isCommandActive(customerCommand.command.getCommandName()), 'cmp-list-item': true, }"
            @mouseover="() => onGroupCommandHovered(index, cmpIndex)"
            @click="() => onCommandClick(customerCommand)"
          >
            <command-name
              :command-name="customerCommand.command.getCommandName()"
              :highlight-arr="customerCommand.highlightArr"
              class="cmp-list-command cmp-list-left"
            />

            <div class="cmp-list-command cmp-list-right">
              <div class="key">
                {{ customerCommand.command.getCommandKey() }}
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import GroupCommand from '../models/groupCommand';
import CommandName from './CommandName.vue';
import NoResult from './NoResult.vue';
import scrollController from '../controllers/scrollController';
import Command from '../models/command';

const props = defineProps({
  closeModal: {
    type: Function,
    default () {
      return '';
    },
  },
  isArrowUp: {
    type: Object,
    default () {
      return {};
    },
  },
  isArrowDown: {
    type: Object,
    default () {
      return {};
    },
  },
  /* GROUP COMMENT DECLARATION DO NOT TOUCH - HAO */
  customerGroupCommands: {
    type: Array as PropType<GroupCommand[]>,
    default () {
      return [];
    },
  },
  customerGroupCommandName: {
    type: String,
    default: '',
  },
  onGroupCommandHovered: {
    type: Function,
    default () {
      return '';
    },
  },
  groupCommandIndex: {
    type: Object,
    default () {
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

const {
  root, groupRef, groupNameRef, commandRef,
} = scrollController(props.groupCommandIndex.groupCommandIndexValue, props.isArrowDown.isArrowDownValue, props.isArrowUp.isArrowUpValue);

const onCommandClick = (customerCommand: { command: Command }) => {
  customerCommand.command.getCommandAction()();
  props.closeModal();
};

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
