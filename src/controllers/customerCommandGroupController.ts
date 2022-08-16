import { ref, watch, Ref } from "vue";
import Command from "../models/command";
import { getHighlights } from "../places/highlightText";
import GroupCommand from "../models/groupCommand";
import customerInputController from "./customerInputController";
export default function customerCommandGroupController(
  textInput: Ref<string>,
  commandsInput: GroupCommand[],
  isTextCleared: Ref<boolean>
) {
  const customerGroupCommands: Ref<GroupCommand[]> =
    ref([]);

  const customerGroupCommand: Ref<Command> = ref(new Command("", "", () => {}));

  const customerCommandGroupIndex: Ref<{groupIndex: number, index: number}> = ref({groupIndex: 0,index:0});
    // Function to filter the command with Group (tree-select)
  function getCustomerGroupCommands(
    /*
    textInputValue: user input
    commandsInput: group of commands
    */
    textInputValue: string,
    commandsInput: GroupCommand[]
  ) {
    let groupCommands: GroupCommand[] = [];

    const regex = new RegExp(textInputValue);
    // loop through every group
    for (let i: number = 0; i < commandsInput.length;++i){
        let commandItems: { command: Command; highlightArr: boolean[] }[] = [];
        // loop through every command in each group
        for (let j: number = 0; j < commandsInput[i].getCommands().length;++j){
            let commandItem: { command: Command; highlightArr: boolean[] };
            commandItem = commandsInput[i].getCommands()[j];
            // if one command match push in to the list
            if(regex.test(commandItem.command.getCommandName())){
                commandItems.push({ command: commandItem.command, highlightArr:
                            textInputValue != ""
                              ? getHighlights(commandItem.command.getCommandName(), textInputValue)
                              : [], })
            }   
        }
        // after loop through one group of command if the length of the result list !== 0 then push into the result list
        if(commandItems.length !== 0){
            let group = new GroupCommand(commandsInput[i].getGroupName(),[]);
            group.setCommandsHighlighted(commandItems);
            groupCommands.push(group);
        }
    }
    customerGroupCommands.value = groupCommands;
  }

  function updateCustomerGroupCommand(groupIndex: number,index: number) {
    customerGroupCommand.value = customerGroupCommands.value[groupIndex].getCommands()[index].command;
    customerCommandGroupIndex.value = {groupIndex:groupIndex,index:index};
  }

  function previousCustomerGroupCommand() {
    // if (customerCommandGroupIndex.value - 1 > -1) {
    //   updateCustomerCommand(customerCommandGroupIndex.value - 1);
    // }
    if(customerCommandGroupIndex.value.index -1 > -1){
      updateCustomerGroupCommand(customerCommandGroupIndex.value.groupIndex,customerCommandGroupIndex.value.index-1);
    }else{
        if (customerCommandGroupIndex.value.groupIndex -1 > -1){
            updateCustomerGroupCommand(customerCommandGroupIndex.value.groupIndex -1,customerGroupCommands.value[customerCommandGroupIndex.value.groupIndex -1].getCommands().length-1);    
        }
    }
  }

  function nextCustomerGroupCommand() {
    // if (customerCommandGroupIndex.value + 1 < customerCommands.value.length) {
    //   updateCustomerCommand(customerCommandGroupIndex.value + 1);
    // }
    if(customerCommandGroupIndex.value.index + 1 < customerGroupCommands.value[customerCommandGroupIndex.value.groupIndex].getCommands().length){
      updateCustomerGroupCommand(customerCommandGroupIndex.value.groupIndex, customerCommandGroupIndex.value.index+1);
    }else{
        if(customerCommandGroupIndex.value.groupIndex + 1 < customerGroupCommands.value.length ){
          updateCustomerGroupCommand(customerCommandGroupIndex.value.groupIndex + 1, 0);        
        }
    }
  }

  function commandGroupRefresh() {
    customerGroupCommands.value = [];
    customerGroupCommand.value = new Command("", "", () => {});
    customerCommandGroupIndex.value = {groupIndex:0, index:0};
  }

  watch(textInput, (value) => {
    if (isTextCleared.value) {
      isTextCleared.value = false;
    } else {
      getCustomerGroupCommands(value, commandsInput);
      if (customerGroupCommands.value.length != 0) {
        updateCustomerGroupCommand(0,0);
      } else {
        commandGroupRefresh();
      }
    }
  });

  return {
    customerGroupCommands,
    getCustomerGroupCommands,
    customerGroupCommand,
    previousCustomerGroupCommand,
    nextCustomerGroupCommand,
    updateCustomerGroupCommand,
    commandGroupRefresh,
    customerCommandGroupIndex
  };
}
