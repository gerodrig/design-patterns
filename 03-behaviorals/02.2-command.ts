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
 */

import { COLORS } from '../helpers/colors.ts';

// 1. Command Interface
interface Command {
  execute(): void;
}

// 2. Receiver Class - TextEditor

class TextEditor {
  private text: string = '';
  private clipboard: string = '';
  private history: string[] = [];

  // Add text to the editor
  type(text: string): void {
    this.history.push(this.text); // Save state before changing it
    this.text += text;
  }

  // Copy the current text
  copy(): void {
    this.clipboard = this.text;
    console.log(
      `Text copied to clipboard: \n%c"${this.clipboard}"`,
      COLORS.blue
    );
  }

  // Paste the text from the clipboard
  paste(): void {
    this.history.push(this.text); // Save state before pasting
    this.text += this.clipboard;
    console.log(`Text after pasting: \n%c"${this.text}"`, COLORS.blue);
  }

  // Undo the last action
  undo(): void {
    if (this.history.length > 0) {
      this.text = this.history.pop()!;
      console.log(`Text after undo: \n%c"${this.text}"`, COLORS.blue);
      return;
    }

    console.log('There is nothing to undo.');
  }

  // Show the current text
  getText(): string {
    return this.text;
  }
}

// 3. Concrete Command Classes
class CopyCommand implements Command {

  //? Inject the editor in the constructor and the execute method with the respective action
  constructor(private editor: TextEditor){}

  execute(): void {
    this.editor.copy();
  }
}

class PasteCommand implements Command {
  //? Inject the editor in the constructor and the execute method with the respective action
  constructor(private editor: TextEditor){}

  execute(): void {
    this.editor.paste();
  }
}

class UndoCommand implements Command {
  //? Inject the editor in the constructor and the execute method with the respective action
  constructor(private editor: TextEditor){}

  execute(): void {
    this.editor.undo();
  }
}

// 4. Client Class - Toolbar

class Toolbar {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command): void {
    //? Assign the command to the corresponding button

    this.commands[button] = command;
  }

  clickButton(button: string): void {
    //? Execute the command corresponding to the button
    if(this.commands[button]){
      this.commands[button].execute();
      return;
    }

    //? Handle the case where there is no command assigned to the button
    console.error(`There is no command assigned to the button "${button}"`);
  }
}

// 5. Client Code to test the Command pattern
// !None of the main code should be modified
function main() {
  const editor = new TextEditor();
  const toolbar = new Toolbar();

  // Create commands for the editor
  const copyCommand = new CopyCommand(editor);
  const pasteCommand = new PasteCommand(editor);
  const undoCommand = new UndoCommand(editor);

  // Assign commands to the toolbar buttons
  toolbar.setCommand('copy', copyCommand);
  toolbar.setCommand('paste', pasteCommand);
  toolbar.setCommand('undo', undoCommand);

  // Simulate text editing
  editor.type('H');
  editor.type('o');
  editor.type('l');
  editor.type('a');
  editor.type(' ');
  editor.type('M');
  editor.type('u');
  editor.type('n');
  editor.type('d');
  editor.type('o');
  editor.type('!');
  console.log(`Current text: %c"${editor.getText()}"`, COLORS.green);

  // Use the toolbar
  console.log('\nCopying text:');
  toolbar.clickButton('copy');

  console.log('\nPasting text:');
  toolbar.clickButton('paste');

  console.log('\nUndoing the last action:');
  toolbar.clickButton('undo');

  console.log('\nUndoing again:');
  toolbar.clickButton('undo');

  console.log(`\nFinal text: "${editor.getText()}"`);
}

main();