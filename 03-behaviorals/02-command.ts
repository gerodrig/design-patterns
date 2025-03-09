/**
 * ! Command Pattern
 * This pattern encapsulates a request as an object,
 * allowing you to parameterize other objects with different requests,
 * queue requests, or log requests, and supports operations that can be undone.
 *
 * I really liked the explanation from Refactoring Guru
 * https://refactoring.guru/design-patterns/command
 *
 * * It is useful when you need to decouple the object that invokes
 * * the operation from the object that knows how to perform it.
 *
 *
 */

import { COLORS } from '../helpers/colors.ts';

interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log('%cThe light 💡 is on', COLORS.yellow);
  }

  turnOff(): void {
    console.log('%cThe light ⏼ is off', COLORS.gray);
  }
}

class Fan {
  on() {
    console.log('%c the Fan 🪭 is turned on', COLORS.green);
  }

  off() {
    console.log('%c the Fan 🪭📵 is turned off', COLORS.gray);
  }
}

//? Commands

class LightOnCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}

  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) {}

  execute(): void {
    this.fan.off();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command) {
    this.commands[button] = command;
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }

    console.log(`%cNo command has been assigned to that button`, COLORS.orange);
  }
}

function main() {
  const remoteControl = new RemoteControl();
  const light = new Light();
  const fan = new Fan();

  //? Create the commands for the devices
  const lightOnCommand = new LightOnCommand(light);
  const lightOffCommand = new LightOffCommand(light);

  const fanOnCommand = new FanOnCommand(fan);
  const fanOffCommand = new FanOffCommand(fan);

  //? Assign action to the remote controller.
  remoteControl.setCommand('1', lightOnCommand);
  remoteControl.setCommand('2', lightOffCommand);
  remoteControl.setCommand('3', fanOnCommand);
  remoteControl.setCommand('4', fanOffCommand);

  let continueProgram = true;

  do {
    console.clear();

    const pressedButton =
      prompt(
        `Press a control button: 
                1. Turn on the lights 💡.
                2. Turn off the lights ⏼.
                3. Turn on the Fan 🪭.
                4. Turn off the Fan 🪭📵.
                
                Button: 
                `
      ) ?? '';

    remoteControl.pressButton(pressedButton);

    const continueProgramResponse = prompt(
      `\n Would you like to continue? (y/n):`
    )?.toLowerCase();

    continueProgram = continueProgramResponse === 'n' ? false : true;
  } while (continueProgram);
}

main();
