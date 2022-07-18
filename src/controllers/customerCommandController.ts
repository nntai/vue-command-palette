import { ref, watch, Ref } from "vue";

import Command from "../models/command";

export default function customerCommandController(
  textInput: Ref<string>,
  commandsInput: Command[]
) {
  const customerCommands: Ref<Command[]> = ref([]);

  const customerCommand: Ref<Command> = ref(new Command("", "", () => {}));

  const customerCommandIndex: Ref<number> = ref(0);

  function getCustomerCommands(
    textInputValue: string,
    commandsInput: Command[]
  ) {
    let commands: Command[] = [];

    const regex = new RegExp(textInputValue);

    for (let i: number = 0; i < commandsInput.length; ++i) {
      if (regex.test(commandsInput[i].getCommandName())) {
        commands.push(commandsInput[i]);
      }
    }

    customerCommands.value = commands;
  }

  function updateCustomerCommand(index: number) {
    customerCommand.value = customerCommands.value[index];

    customerCommandIndex.value = index;
  }

  function previousCustomerCommand() {
    if (customerCommandIndex.value - 1 > -1) {
      updateCustomerCommand(customerCommandIndex.value - 1);
    }
  }

  function nextCustomerCommand() {
    if (customerCommandIndex.value + 1 < customerCommands.value.length) {
      updateCustomerCommand(customerCommandIndex.value + 1);
    }
  }

  function commandRefresh() {
    customerCommands.value = [];
    customerCommand.value = new Command("", "", () => {});
    customerCommandIndex.value = 0;
  }

  watch(textInput, (value) => {
    if (value != "") {
      getCustomerCommands(value, commandsInput);

      if (customerCommands.value.length != 0) {
        updateCustomerCommand(0);
      }
    }
  });

  return {
    customerCommands,
    getCustomerCommands,
    customerCommand,
    previousCustomerCommand,
    nextCustomerCommand,
    updateCustomerCommand,
    commandRefresh,
  };
}
