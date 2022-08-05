import { ref, watch, Ref, onMounted } from "vue";
import Command from "../models/command";
import { getHighlightIndexes } from "../places/highlightText";

import { getHighlightedIndexes } from "../places/highlightedText";

export default function customerCommandController(
  textInput: Ref<string>,
  commandsInput: Command[]
) {
  const localCommands: Ref<{command: Command, highlightedIndexes:number[][]}[]> = ref([]);

  const customerCommand: Ref<Command> = ref(new Command("", "", () => {}));

  const customerCommandIndex: Ref<number> = ref(0);

  function getCustomerCommands(
    textInputValue: string,
    commandsInput: Command[]
  ) {
    let commands: {command: Command, highlightedIndexes:number[][]}[] = [];

    const regex = new RegExp(textInputValue);
    for (let i: number = 0; i < commandsInput.length; ++i) {
      if (regex.test(commandsInput[i].getCommandName())) {
        if(textInputValue===""){
          commands.push({command: commandsInput[i], highlightedIndexes:[]});
        }else{
          let highlighted = getHighlightedIndexes(commandsInput[i].getCommandName(),textInputValue);
          commands.push({command: commandsInput[i], highlightedIndexes: highlighted});
        }
      }
    }

    localCommands.value = commands;
  }

  function updateCustomerCommand(index: number) {
    customerCommand.value = localCommands.value[index].command;

    customerCommandIndex.value = index;
  }

  function previousCustomerCommand() {
    if (customerCommandIndex.value - 1 > -1) {
      updateCustomerCommand(customerCommandIndex.value - 1);
    }
  }

  function nextCustomerCommand() {
    if (customerCommandIndex.value + 1 < localCommands.value.length) {
      updateCustomerCommand(customerCommandIndex.value + 1);
    }
  }

  function commandRefresh() {
    localCommands.value = [];
    customerCommand.value = new Command("", "", () => {});
    customerCommandIndex.value = 0;
  }

  watch(textInput, (value) => {
    getCustomerCommands(value, commandsInput);

    if (localCommands.value.length != 0) {
      updateCustomerCommand(0);
    }
  });

  onMounted(() => {
    getCustomerCommands(textInput, commandsInput)
  });

  return {
    localCommands,
    getCustomerCommands,
    customerCommand,
    previousCustomerCommand,
    nextCustomerCommand,
    updateCustomerCommand,
    commandRefresh,
  };
}
