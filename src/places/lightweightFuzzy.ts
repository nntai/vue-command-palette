import GroupCommand from "../models/groupCommand";
import Command from "../models/command";
export default function lightweightFuzzy(
  input: string,
  groupCommandArr: GroupCommand[]
) {
  let result: GroupCommand[] = [];
  let inputWithoutSpace = input.replaceAll(" ", "");
  let inputCharArr = inputWithoutSpace.split("");
  for (let i: number = 0; i < groupCommandArr.length; i++) {
    let commandArr: {
      command: Command;
      highlightArr: boolean[];
      count: number;
    }[] = [];
    for (let j: number = 0; j < groupCommandArr[i].getCommands().length; j++) {
      let commandName = groupCommandArr[i]
        .getCommands()
        [j].command.getCommandName();
      let position: number = 0;
      let count: number = 0;
      let lastIndex: number = groupCommandArr[i]
        .getCommands()
        [j].command.getCommandName().length;
      let commandItem: {
        command: Command;
        highlightArr: boolean[];
        count: number;
      };
      let highlight: boolean[] = [];
      for (
        let highlightIndex: number = 0;
        highlightIndex < commandName.length;
        highlightIndex++
      ) {
        highlight.push(false);
      }
      for (let index: number = 0; index < inputCharArr.length; index++) {
        let currentIndex: number = 0;
        currentIndex = commandName
          .toLowerCase()
          .substring(position, lastIndex)
          .indexOf(inputCharArr[index]);
        if (currentIndex == -1) {
          break;
        } else {
          count++;
        }
        highlight[position + currentIndex] = true;
        position = position + 1 + currentIndex;
      }

      if (count > 0) {
        if(count/inputCharArr.length>=0.5){
            commandItem = {
                command: groupCommandArr[i].getCommands()[j].command,
                highlightArr: highlight,
                count: count,
              };
              commandArr.push(commandItem);
        }
      }
    }
    let sorted = sortedFuzzyArray(commandArr);
    if (sorted.length > 0) {
      let group = new GroupCommand(groupCommandArr[i].getGroupName(), []);
      group.setCommandsHighlighted(sorted);
      result.push(group);
    }
  }
  return result;
}

export function sortedFuzzyArray(
  commandArr: { command: Command; highlightArr: boolean[]; count: number }[]
) {
  let sortedArr: {
    command: Command;
    highlightArr: boolean[];
    count: number;
  }[] = commandArr;
  for (let i: number = 0; i < sortedArr.length; i++) {
    let temp: { command: Command; highlightArr: boolean[]; count: number };
    for (let j: number = 0; j < sortedArr.length - i - 1; j++) {
      if (sortedArr[j].count <= sortedArr[j + 1].count) {
        temp = sortedArr[j];
        sortedArr[j] = sortedArr[j + 1];
        sortedArr[j + 1] = temp;
      }
    }
  }
  let sortedArrWithoutCount: { command: Command; highlightArr: boolean[] }[] =
    [];
  sortedArr.forEach(
    (element: { command: Command; highlightArr: boolean[]; count: number }) => {
      sortedArrWithoutCount.push({
        command: element.command,
        highlightArr: element.highlightArr,
      });
    }
  );
  return sortedArrWithoutCount;
}
