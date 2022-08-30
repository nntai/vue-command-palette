export default class Command {
  public commandName = '';
  public commandKey = '';
  public commandAction: () => any = () => {};

  public constructor (name: string, key: string, action: () => any) {
    this.commandName = name;
    this.commandKey = key;
    this.commandAction = action;
  }

  public getCommandName (): string {
    return this.commandName;
  }

  public setCommandName (name: string): void {
    this.commandName = name;
  }

  public getCommandKey (): string {
    return this.commandKey;
  }

  public setCommandKey (key: string): void {
    this.commandKey = key;
  }

  public getCommandAction (): Function {
    return this.commandAction;
  }

  public setCommandAction (action: () => any): void {
    this.commandAction = action;
  }
}
