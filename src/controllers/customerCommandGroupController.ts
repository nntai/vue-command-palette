import {
  ref, watch, Ref, computed,
} from 'vue';
import Command from '../models/command';
import { getHighlights } from '../methods/highlightText';
import GroupCommand from '../models/groupCommand';
import lightweightFuzzy from '../methods/lightweightFuzzy';

export default function customerCommandGroupController (
  textInput: Ref<string>,
  isTextCleared: Ref<boolean>,
  commandGroupsInput: {groupName: string, commands: {commandName: string, commandKey: string, commandAction: (Function)}[]}[],
) {
  const customerGroupsBase = computed(() => {
    const commandGroups: GroupCommand[] = [];
    for (let i = 0; i < commandGroupsInput.length; i++) {
      const commands: Command[] = [];
      for (let j = 0; j < commandGroupsInput[i].commands.length; j++) {
        const commandItem: Command = new Command(
          commandGroupsInput[i].commands[j].commandName,
          commandGroupsInput[i].commands[j].commandKey,
          commandGroupsInput[i].commands[j].commandAction,
        );
        commands.push(commandItem);
      }
      const commandGroup: GroupCommand = new GroupCommand(commandGroupsInput[i].groupName, commands);
      commandGroups.push(commandGroup);
    }
    return commandGroups;
  });

  const customerGroupCommands: Ref<GroupCommand[]> = ref([]);
  const customerGroupCommand: Ref<Command> = ref(new Command('', '', () => {}));

  const customerCommandGroupIndex: Ref<{ groupIndex: number; index: number }> = ref({ groupIndex: 0, index: 0 });
  // Function to filter the command with Group (tree-select)
  function getCustomerGroupCommands (
    /*
    textInputValue: user input
    commandsInput: group of commands
    */
    textInputValue: string,
    commandsInput: GroupCommand[],
  ) {
    const textInputRemoveSpecialChar = textInputValue.replace(/[^\w\s]/gi, '');
    const groupCommands: GroupCommand[] = [];
    const groupCommandsLeftover: GroupCommand[] = [];
    const regex = new RegExp(textInputRemoveSpecialChar.toLowerCase());
    // loop through every group
    for (let i = 0; i < commandsInput.length; ++i) {
      const commandItems: { command: Command; highlightArr: boolean[] }[] = [];
      const commandItemsLeftover: {
        command: Command;
        highlightArr: boolean[];
      }[] = [];
      // loop through every command in each group
      for (let j = 0; j < commandsInput[i].getCommands().length; ++j) {
        const commandItem: { command: Command; highlightArr: boolean[] } = commandsInput[i].getCommands()[j];
        // if one command match push in to the list
        if (regex.test(commandItem.command.getCommandName().toLowerCase())) {
          commandItems.push({
            command: commandItem.command,
            highlightArr:
              textInputRemoveSpecialChar.toLowerCase() !== ''
                ? getHighlights(
                  commandItem.command.getCommandName().toLowerCase(),
                  textInputRemoveSpecialChar.toLowerCase(),
                )
                : [],
          });
        } else {
          commandItemsLeftover.push({
            command: commandItem.command,
            highlightArr: [],
          });
        }
      }
      // after loop through one group of command if the length of the result list !== 0 then push into the result list
      if (commandItems.length !== 0) {
        const group = new GroupCommand(commandsInput[i].getGroupName(), []);
        group.setCommandsHighlighted(commandItems);
        groupCommands.push(group);
      }
      if (commandItemsLeftover.length !== 0) {
        const group = new GroupCommand(commandsInput[i].getGroupName(), []);
        group.setCommandsHighlighted(commandItemsLeftover);
        groupCommandsLeftover.push(group);
      }
    }
    const fuzzySearchSortedArr: GroupCommand[] = lightweightFuzzy(
      textInputRemoveSpecialChar.toLowerCase(),
      groupCommandsLeftover,
    );
    for (
      let fuzzyIndex = 0;
      fuzzyIndex < fuzzySearchSortedArr.length;
      fuzzyIndex++
    ) {
      const isExist: number = groupCommands.findIndex((groupCommand: GroupCommand) => {
        return (
          fuzzySearchSortedArr[fuzzyIndex].getGroupName()
          === groupCommand.getGroupName()
        );
      });
      if (isExist > -1) {
        groupCommands[isExist].setCommandsHighlighted(
          groupCommands[isExist]
            .getCommands()
            .concat(fuzzySearchSortedArr[fuzzyIndex].getCommands()),
        );
      } else {
        groupCommands.push(fuzzySearchSortedArr[fuzzyIndex]);
      }
    }
    customerGroupCommands.value = groupCommands;
  }

  function updateCustomerGroupCommand (groupIndex: number, index: number) {
    customerGroupCommand.value = customerGroupCommands.value[groupIndex].getCommands()[index].command;
    customerCommandGroupIndex.value = { groupIndex, index };
  }

  function previousCustomerGroupCommand () {
    if (customerGroupCommands.value.length !== 0) {
      if (customerCommandGroupIndex.value.index - 1 > -1) {
        updateCustomerGroupCommand(
          customerCommandGroupIndex.value.groupIndex,
          customerCommandGroupIndex.value.index - 1,
        );
      } else if (customerCommandGroupIndex.value.groupIndex - 1 > -1) {
        updateCustomerGroupCommand(
          customerCommandGroupIndex.value.groupIndex - 1,
          customerGroupCommands.value[
            customerCommandGroupIndex.value.groupIndex - 1
          ].getCommands().length - 1,
        );
      }
    }
  }

  function nextCustomerGroupCommand () {
    if (customerGroupCommands.value.length !== 0) {
      if (
        customerCommandGroupIndex.value.index + 1
        < customerGroupCommands.value[
          customerCommandGroupIndex.value.groupIndex
        ].getCommands().length
      ) {
        updateCustomerGroupCommand(
          customerCommandGroupIndex.value.groupIndex,
          customerCommandGroupIndex.value.index + 1,
        );
      } else if (
        customerCommandGroupIndex.value.groupIndex + 1
          < customerGroupCommands.value.length
      ) {
        updateCustomerGroupCommand(
          customerCommandGroupIndex.value.groupIndex + 1,
          0,
        );
      }
    }
  }

  function commandGroupRefresh () {
    customerGroupCommands.value = [];
    customerGroupCommand.value = new Command('', '', () => {});
    customerCommandGroupIndex.value = { groupIndex: 0, index: 0 };
  }

  function getAllCommands () {
    getCustomerGroupCommands('', customerGroupsBase.value);

    if (customerGroupCommands.value.length !== 0) {
      updateCustomerGroupCommand(0, 0);
    }
  }

  watch(textInput, (value) => {
    if (!isTextCleared.value) {
      getCustomerGroupCommands(value, customerGroupsBase.value);
      if (customerGroupCommands.value.length !== 0) {
        updateCustomerGroupCommand(0, 0);
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
    customerCommandGroupIndex,
    getAllCommands,
    customerGroupsBase,
  };
}
