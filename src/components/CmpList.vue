<template>
  <div>
  <div></div>
    <!-- <div v-for="(customerCommand, index) in props.customerCommands" :key="index" :class="{'cmp-list-is-active': isCommandActive(customerCommand.getCommandName())}" @mouseover="() => {props.onCommandHovered(index);}" @click="() => {customerCommand.getCommandAction()(); props.closeModal();}">
      <div class="cmp-list cmp-list-left">{{customerCommand.getCommandName()}}</div>
      <div class="cmp-list cmp-list-right">{{customerCommand.getCommandKey()}}</div>
    </div> -->
    <div v-if="props.customerCommands.length===0 && props.searchPhrase.length !==0">
      <NoResult/>
    </div>
    <div v-else>
      <div v-for="(customerCommand, index) in props.customerCommands" :key="index" :class="{'cmp-list-is-active': isCommandActive(customerCommand.command.getCommandName())}" @mouseover="() => {props.onCommandHovered(index);}" @click="() => {customerCommand.command.getCommandAction()(); props.closeModal();}">
      <cmp-command-name class="cmp-list-modal cmp-list-left" :customerCommandName="customerCommand.command.getCommandName()" :highlightedIndexes="customerCommand.highlightedIndexes"/>
      <div class="cmp-list-modal cmp-list-right">{{customerCommand.command.getCommandKey()}}</div>
    </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Command from "../models/command";
  import resultDisplayController from "../controllers/resultDisplayController";
  import NoResult from "./NoResult.vue";
  import CmpCommandName from "./CmpCommandName.vue";
  
  const props = defineProps({
    customerCommands: {
      type: Array,
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

  const isTest = resultDisplayController(props.customerCommands, props.searchPhrase);
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
</style>
