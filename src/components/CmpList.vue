<template>
  <div>
    Cmp List
    <div v-for="(customerCommand, index) in props.customerCommands" :key="index" :class="{'cmp-list-is-active': isCommandActive(customerCommand.command.getCommandName()), 'cmp-list-item': true}" @mouseover="() => {props.onCommandHovered(index);}" @click="() => {customerCommand.command.getCommandAction()(); props.closeModal();}">
      <command-name :commandName="customerCommand.command.getCommandName()" :highlightArr="customerCommand.highlightArr" class="cmp-list cmp-list-left" />
      <div class="cmp-list cmp-list-right">{{customerCommand.command.getCommandKey()}}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Command from "../models/command";

  import CommandName from "./CommandName.vue";
  
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
    }
  });

  const isCommandActive = (commandName: string) => {
    return commandName === props.customerCommandName;
  };
</script>
<style scoped>
  

  .cmp-list {
    display: inline-block;
    width: 50%;
  }


  .cmp-list-left {
    text-align: left;
  }


  .cmp-list-right {
    text-align: right;
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
