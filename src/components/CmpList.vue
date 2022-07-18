<template>
  <div>
    Cmp List
    <div v-for="(customerCommand, index) in props.customerCommands" :key="index" :class="{'cmp-list-is-active': isCommandActive(customerCommand.getCommandName())}" @mouseover="() => {props.onCommandHovered(index);}" @click="() => {customerCommand.getCommandAction()(); props.closeModal();}">
      <div class="cmp-list cmp-list-left">{{customerCommand.getCommandName()}}</div>
      <div class="cmp-list cmp-list-right">{{customerCommand.getCommandKey()}}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Command from "../models/command";
  
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
</style>
