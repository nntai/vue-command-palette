export default class Command {
  private commandName: string = "";
  private commandKey: string = "";
  private commandAction: Function = () => {};
  
  public constructor(name: string, key: string, action: Function) {
    this.commandName = name;
    this.commandKey = key;
    this.commandAction = action;
  }

  public getCommandName(): string {
    return this.commandName;
  }

  public setCommandName(name: string): void {
    this.commandName = name;
  }

  public getCommandKey(): string {
    return this.commandKey;
  }

  public setCommandKey(key: string): void {
    this.commandKey = key;
  }

  public getCommandAction(): Function {
    return this.commandAction;
  }

  public setCommandAction(action: Function): void {
    this.commandAction = action;
  }
}
