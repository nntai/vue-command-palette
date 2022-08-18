<template>
  <div class="result" ref="root">
    <div v-if="props.customerGroupCommands.length === 0">
      <no-result />
    </div>
    <div v-else v-for="(customerGroupCommand, index) in props.customerGroupCommands" :key="index" ref="groupRef">
      <div v-if="isDisplayByGroup" ref="groupNameRef">{{ customerGroupCommand.getGroupName() }}</div>
      <div v-for="(customerCommand, cmpIndex) in customerGroupCommand.getCommands()" :key="cmpIndex" ref="commandRef"
        :class="{ 'cmp-list-is-active': isCommandActive(customerCommand.command.getCommandName()), 'cmp-list-item': true, }"
        @mouseover="() => { props.onGroupCommandHovered(index, cmpIndex); }"
        @click="() => { customerCommand.command.getCommandAction()(); props.closeModal(); }">
        <slot :commandName="customerCommand.command.getCommandName()" name="cmd-name">
          <command-name :commandName="customerCommand.command.getCommandName()"
            :highlightArr="customerCommand.highlightArr" class="cmp-list-command cmp-list-left" />
        </slot>
        <slot :commandKey="customerCommand.command.getCommandKey()" name="cmd-key">
          <div class="cmp-list-command cmp-list-right">
            <div class="key">{{ customerCommand.command.getCommandKey() }}</div>
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
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  closeModal: {
    type: Function,
    default: function () {
      return "";
    }
  },
  isArrowUp: {
    type: Object,
    default: function () {
      return {};
    }
  },
  isArrowDown: {
    type: Object,
    default: function () {
      return {};
    }
  },
  /*GROUP COMMENT DECLARATION DO NOT TOUCH - HAO*/
  customerGroupCommands: {
    type: Array,
    default: function (placeProps) {
      return [];
    }
  },
  customerGroupCommandName: {
    type: String,
    default: ""
  },
  onGroupCommandHovered: {
    type: Function,
    default: function () {
      return "";
    }
  },
  groupCommandIndex: {
    type: Object,
    default: function () {
      return {};
    }
  },
  isDisplayByGroup: {
    type: Boolean,
    default: false
  }
});

const isCommandActive = (commandName: string) => {
  return commandName === props.customerGroupCommandName;
};
const root = ref<HTMLElement | null>(null);
const groupRef = ref<HTMLElement | null>(null);
const groupNameRef = ref<HTMLElement | null>(null);
const commandRef = ref<HTMLElement | null>(null);
// watch(props.isArrowDown.isArrowDownValue, (value) => {
//   if (value) {
//     let totalLength = 0;
//     for (let i = 0; i < props.groupCommandIndex.groupCommandIndexValue.value.index+1;i++){
//       totalLength += root2.value[i].clientHeight;
//      }
//     if(totalLength>root.value.clientHeight){
//      root.value.scrollTop = totalLength-root.value.clientHeight;
//     }
//   }
// });
// watch(props.isArrowUp.isArrowUpValue, (value) => {
//   if (value) {
//     let totalLength = 0;
//     for (let i = 0; i < props.groupCommandIndex.groupCommandIndexValue.value.index;i++){
//       totalLength += root2.value[i].clientHeight;
//      }
//      if(totalLength<root.value.scrollTop){
//        root.value.scrollTop = totalLength; 
//      }    
//   }
// });

//   watch(props.isArrowDown.isArrowDownValue,(value)=>{
//     if(value){
//       if(props.customerGroupCommands.length !== 0){
// let totalLength = 0;
//       console.log("test",props.groupCommandIndex.groupCommandIndexValue.value);
//       // for (let i = 0; i < props.groupCommandIndex.groupCommandIndexValue.value.index+1;i++){
//       //   totalLength += root2.value[i].clientHeight;
//       //  }
//       for (let i: number = 0; i < props.groupCommandIndex.groupCommandIndexValue.value.groupIndex;i++){
//         totalLength += groupRef.value[i].clientHeight;
//       }
//       if(groupNameRef.value!==null){
//         totalLength+= groupNameRef.value[props.groupCommandIndex.groupCommandIndexValue.value.groupIndex].clientHeight;
//       }
//       for(let i: number = 0; i < props.groupCommandIndex.groupCommandIndexValue.value.index+1;i++){
//         totalLength += commandRef.value[i].clientHeight;
//       }
//       if(totalLength>root.value.scrollTop+root.value.clientHeight){
//         root.value.scrollTop = totalLength - root.value.clientHeight;
//       }
//       }

//     }
//   });
//   watch(props.isArrowUp.isArrowUpValue,(value)=>{
//     if(value){
//       if(props.customerGroupCommands.length !== 0){
// let totalLength = 0;
//         for (let i: number = 0; i < props.groupCommandIndex.groupCommandIndexValue.value.groupIndex;i++){
//         totalLength += groupRef.value[i].clientHeight;
//       }
//       if(groupNameRef.value!==null){
//       totalLength+= groupNameRef.value[props.groupCommandIndex.groupCommandIndexValue.value.groupIndex].clientHeight;
//       }
//       for(let i: number = 0; i < props.groupCommandIndex.groupCommandIndexValue.value.index;i++){
//         totalLength += commandRef.value[i].clientHeight;
//       }
//       if(totalLength<root.value.scrollTop){
//          root.value.scrollTop = totalLength; 
//       }
//       console.log("length: ", totalLength);
//       console.log("high", root.value.clientHeight);
//       }

//     }
//   });


watch(props.groupCommandIndex.groupCommandIndexValue, (value) => {
  if (props.isArrowDown.isArrowDownValue.value) {
    if (props.customerGroupCommands.length !== 0) {
      let totalLength = 0;
      console.log("test", value);
      // for (let i = 0; i < props.groupCommandIndex.groupCommandIndexValue.value.index+1;i++){
      //   totalLength += root2.value[i].clientHeight;
      //  }
      for (let i: number = 0; i < value.groupIndex; i++) {
        totalLength += groupRef.value[i].clientHeight;
      }
      if (groupNameRef.value !== null) {
        totalLength += groupNameRef.value[value.groupIndex].clientHeight;
      }
      for (let i: number = 0; i < value.index + 1; i++) {
        totalLength += commandRef.value[i].clientHeight;
      }
      if (totalLength > root.value.scrollTop + root.value.clientHeight) {
        root.value.scrollTop = totalLength - root.value.clientHeight;
      }
    }

  }


  if (props.isArrowUp.isArrowUpValue.value) {
    if (props.customerGroupCommands.length !== 0) {
      let totalLength = 0;
      for (let i: number = 0; i < value.groupIndex; i++) {
        totalLength += groupRef.value[i].clientHeight;
      }
      if (groupNameRef.value !== null) {
        totalLength += groupNameRef.value[value.groupIndex].clientHeight;
      }
      for (let i: number = 0; i < value.index; i++) {
        totalLength += commandRef.value[i].clientHeight;
      }
      if (totalLength < root.value.scrollTop) {
        root.value.scrollTop = totalLength;
      }
      console.log("length: ", totalLength);
      console.log("high", root.value.clientHeight);
    }

  }
});


onMounted(() => {
  root.value?.addEventListener("scroll", () => {
    let totalLength1 = 0;
    let totalLength2 = 0;
    let totalLength3 = 0;
    for (let i: number = 0; i < groupRef.value?.length; i++) {
      totalLength1 += groupRef.value[i].clientHeight;
    }
    for (let i: number = 0; i < groupNameRef.value?.length; i++) {
      totalLength2 += groupNameRef.value[i].clientHeight;
    }
    for (let i: number = 0; i < commandRef.value?.length; i++) {
      totalLength3 += commandRef.value[i].clientHeight;
    }
    // console.log("Group",totalLength1);
    // console.log("Group Name",totalLength2);
    // console.log("Command",totalLength3);
  });
});
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
  font-family: 'Open Sans';
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
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  color: #BEC1CB;
  display: inline;
  text-transform: capitalize;
}

.cmp-list-is-active {
  border-radius: 4px;
  border: #7AE1AA 1px solid;
  background-color: #7AE1AA;
  color: white;
}

.cmp-list-item {
  width: 100%;
  padding: 3% 2%;
  font-size: 15px;
}

::-webkit-scrollbar {
  width: .5em;
}

::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 5px;
}
</style>


