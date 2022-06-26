import { ref, watch, Ref } from "vue";

export default function customerCommandController(
  textInput: Ref<string>,
  commandsInput: {
    commandName: string;
    commandKey: string;
    commandAction: Function;
  }[]
) {
  const customerCommands: Ref<
    { commandName: string; commandKey: string; commandAction: Function }[]
  > = ref([]);

  function getCustomerCommands(
    textInput: string,
    commandsInput: {
      commandName: string;
      commandKey: string;
      commandAction: Function;
    }[]
  ) {
    let commands: {
      commandName: string;
      commandKey: string;
      commandAction: Function;
    }[] = [];

    const regex = new RegExp(textInput);

    for (let i: number = 0; i < commandsInput.length; ++i) {
      if (regex.test(commandsInput[i].commandName)) {
        commands.push(commandsInput[i]);
      }
    }

    customerCommands.value = commands;
  }

  watch(textInput, (value) => {
    getCustomerCommands(value, commandsInput);
  });

  return {
    customerCommands,
    getCustomerCommands,
  };
}
