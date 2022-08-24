import Command from './command';

export default class GroupCommand {
  private groupName = '';
  private commands: { command: Command; highlightArr: boolean[] }[] = [];
  public constructor (name:string, commandsList:Command[]) {
    this.groupName = name;
    const list:{ command: Command; highlightArr: boolean[] }[] = [];
    for (let i = 0; i < commandsList.length; i++) {
      const item: { command: Command; highlightArr: boolean[] } = { command: commandsList[i], highlightArr: [] };
      list.push(item);
    }
    this.commands = list;
  }

  public getGroupName (): string {
    return this.groupName;
  }

  public setGroupName (name: string): void {
    this.groupName = name;
  }

  public getCommands (): { command: Command; highlightArr: boolean[] }[] {
    return this.commands;
  }

  public setCommands (commandsList: Command[]): void {
    const list:{ command: Command; highlightArr: boolean[] }[] = [];
    for (let i = 0; i < commandsList.length; i++) {
      const item: { command: Command; highlightArr: boolean[] } = { command: commandsList[i], highlightArr: [] };
      list.push(item);
    }
    this.commands = list;
  }

  public setCommandsHighlighted (commandsList:{ command: Command; highlightArr: boolean[] }[]): void {
    this.commands = commandsList;
  }
}
