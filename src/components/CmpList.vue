<template>
  <div>
    <div v-if="customerCommands.length===0 && searchPhrase.length !==0">
      <NoResult/>
    </div>
    <div v-else>
      <div
        v-for="(customerCommand, index) in customerCommands"
        :key="index"
        :class="{'cmp-list-is-active': isCommandActive(customerCommand.command.getCommandName())}"
        @mouseover="() => {onCommandHovered(index);}"
        @click="() => {customerCommand.command.getCommandAction()(); closeModal();}"
      >
        <cmp-command-name class="cmp-list-modal cmp-list-left" :customerCommandName="customerCommand.command.getCommandName()" :highlightedIndexes="customerCommand.highlightedIndexes"/>
        <div class="cmp-list cmp-list-modal cmp-list-right">{{customerCommand.command.getCommandKey()}}</div>
        <slot :commandName="customerCommand.command.getCommandName()" name="cmdName">
          <div class="cmp-list cmp-list-left">
            {{customerCommand.command.getCommandName()}}
          </div>
        </slot>
        <slot :commandKey="customerCommand.command.getCommandKey()" name="cmdKey">
          <div class="cmp-list cmp-list-right">
          {{customerCommand.command.getCommandKey()}}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { PropType } from 'vue';
  import Command from "../models/command";
  import CommandName from "./CommandName.vue";
  import resultDisplayController from "../controllers/resultDisplayController";
  import NoResult from "./NoResult.vue";
  import CmpCommandName from "./CmpCommandName.vue";

  const props = defineProps({
    customerCommands: {
      type: Array as PropType<Command[]>,
      default: function(placeProps) {
        return [];
      }
    },
    customerCommandName: {
      type: String,
      default: ""
    },
    onCommandHovered: {
      type: Function,
      default: function() {
        return "";
      }
    },
    closeModal: {
      type: Function,
      default: function() {
        return "";
      }
    },
    searchPhrase: {
      type: String,
      default: ""
    }
  });

  const isCommandActive = (commandName: string) => {
    return commandName === props.customerCommandName;
  };

</script>
<style scoped>


.title-name{
  text-align: left;
  color: #858B9D;
  font-family: 'Open Sans';
}
  .cmp-list-modal {
    display: inline-block;
    width: 50%;
  }


  .cmp-list-left {
    text-align: left;
    font-family: 'Open Sans';
  }


  .cmp-list-right {
    text-align: right;
    font-family: 'Open Sans';
    color: #BEC1CB;
  }


  .cmp-list-is-active {
    background-color: #111111;
    color: #ffffff;
  }









  .cmp-list-item {
    width: 100%;
    padding: 3% 2%;
    font-size: 15px;
  }


</style>
