<template>
  <div>
    <div v-if="props.customerCommands.length===0">
      <no-result />
    </div>
    <div v-else v-for="(customerCommand, index) in props.customerCommands" :key="index" :class="{'cmp-list-is-active': isCommandActive(customerCommand.command.getCommandName()), 'cmp-list-item': true}" @mouseover="() => {props.onCommandHovered(index);}" @click="() => {customerCommand.command.getCommandAction()(); props.closeModal();}">
      <slot :commandName="customerCommand.command.getCommandName()" name="cmd-name">
        <command-name 
          :commandName="customerCommand.command.getCommandName()" 
          :highlightArr="customerCommand.highlightArr" 
          class="cmp-list-command cmp-list-left" 
        />
      </slot>
      <slot :commandKey="customerCommand.command.getCommandKey()" name="cmd-key">
        <div 
          class="cmp-list-command cmp-list-right">
          <div class="key">{{customerCommand.command.getCommandKey()}}</div>
          <!--
            <div class="key">{{customerCommand.command.getCommandKey()}}</div>
          -->
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Command from "../models/command";

  import CommandName from "./CommandName.vue";

  import NoResult from "./NoResult.vue";
import CommandPalette from "../CommandPalette.vue";
  
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
  
.title-name{
  text-align: left;
  color: #858B9D;
  font-family: 'Open Sans';
}
  .cmp-list-command {
    display: inline-block;
    width: 50%;
  }


  .cmp-list-left {
    text-align: left;
    font-family: 'Open Sans';
  }


  .cmp-list-right {
    text-align: right;
  }
  .key {
    display: inline;
    border: 2px solid black; 
    box-shadow: 2px 2px black; 
    font-size: .85em; 
    line-height: .85em; 
    display: inline-block;
    font-weight: 600;
    letter-spacing: .05em; 
    padding: 3px 5px;
    white-space: nowrap;
  }


  .cmp-list-is-active {
    border-radius: 4px;
    background-color: green;
    color: #ffffff;
  }
  .cmp-list-item {
    width: 100%;
    padding: 3% 2%;
    font-size: 15px;
  }
</style>


