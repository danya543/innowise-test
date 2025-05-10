export class ButtonHandler {
  constructor() {
    this.commands = {};
  }

  setCommand(key, command) {
    this.commands[key] = command;
  }

  handle(key) {
    if (this.commands[key]) {
      this.commands[key].execute();
    }
  }
}
