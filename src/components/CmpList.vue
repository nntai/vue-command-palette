<template>
  <div class="result" ref="root">
    <div v-if="props.customerCommands.length===0">
      <no-result />
    </div>
    <div v-else v-for="(customerCommand, index) in props.customerCommands" :key="index" ref="root2" :class=" {'cmp-list-is-active': isCommandActive(customerCommand.command.getCommandName()), 'cmp-list-item': true, }" @mouseover="() => {props.onCommandHovered(index);}" @click="() => {customerCommand.command.getCommandAction()(); props.closeModal();}">
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
  import { onMounted,ref, watch} from "vue";
  
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
    isArrowUp: {
      type: Object,
      default: function() {
        return {};
      }
    },
    isArrowDown: {
      type: Object,
      default: function() {
        return {};
      }
    },
    commandIndex: {
      type: Object,
      default: function() {
        return {};
      }
    },
  });

  const isCommandActive = (commandName: string) => {
    return commandName === props.customerCommandName;
  };
  const root = ref<HTMLElement | null>(null);
  const root2 = ref<HTMLElement | null>(null);
  watch(props.isArrowDown.isArrowDownValue, (value) => {
    if (value) {
      let totalLength = 0;
      for (let i = 0; i < props.commandIndex.commandIndexValue.value+1;i++){
        totalLength += root2.value[i].clientHeight;
       }
      if(totalLength>root.value.clientHeight){
       root.value.scrollTop = totalLength-root.value.clientHeight;
      }
    }
  });
  watch(props.isArrowUp.isArrowUpValue, (value) => {
    if (value) {
      let totalLength = 0;
      for (let i = 0; i < props.commandIndex.commandIndexValue.value;i++){
        totalLength += root2.value[i].clientHeight;
       }
       console.log(root.value.scrollTop)
       if(totalLength<root.value.scrollTop){
         root.value.scrollTop = totalLength; 
       }    
    }
  });
   watch(props.commandIndex.commandIndexValue, (value) => {
  });
</script>
<style scoped>
  
.result{
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
    
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }


  .cmp-list-right {
    text-align: right;
  }
  .key {
    /* display: inline;
    border: 2px solid black; 
    box-shadow: 2px 2px black; 
    font-size: .85em; 
    line-height: .85em; 
    display: inline-block;
    font-weight: 600;
    letter-spacing: .05em; 
    padding: 3px 5px;
    white-space: nowrap; */
  width: 63px;
  height: 16px;
  
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  color: rgba(235, 235,235,0.6);
  display:inline;
  text-transform: capitalize;
  }

  .cmp-list-is-active {
    border-radius: 4px;
    border: #7AE1AA 1px solid;
    background-color: #7AE1AA;
  }
  .cmp-list-item {
    width: 100%;
    padding: 3% 2%;
    font-size: 15px;
    color: rgba(235, 235,235,0.6);
  }
 ::-webkit-scrollbar {
  width: .5em;
}
 
::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 5px;
}
</style>


