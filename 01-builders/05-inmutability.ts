/**
 * ! Immutability with copy
 * Although immutability is a good practice, it is not always possible.
 * In these cases, you can make a copy of the object and modify the copy.
 *
 *  * It is useful for maintaining a history of states in interactive applications.
 *
 */

import { COLORS } from '../helpers/colors.ts';

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsavedChanges: boolean;

  constructor(
    content: string,
    cursorPosition: number,
    unsavedChanges: boolean
  ) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsavedChanges = unsavedChanges;
  }

  copyWith({content, cursorPosition, unsavedChanges}: Partial<CodeEditorState>){

    return new CodeEditorState(
        content ?? this.content,
        cursorPosition ?? this.cursorPosition,
        unsavedChanges ?? this.unsavedChanges
    )
  }

  displayState() {
    console.log(`\n%cEditor State: `, COLORS.green);
    console.log(`
            Content: ${this.content}
            Cursor Position: ${this.cursorPosition}
            Unsaved Changes: ${this.unsavedChanges}
            `);
  }
}

class codeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {

    if(this.currentIndex < this.history.length -1 ){
        this.history = this.history.splice(0, this.currentIndex + 1);
    }

    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if(this.currentIndex > 0){
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    
    return null;

  }

  redo(): CodeEditorState | null {
    if(this.currentIndex < this.history.length - 1 ){
        this.currentIndex++;
        return this.history[this.currentIndex];
    }

    return null;
  }
}

function main(){
  const history = new codeEditorHistory();
  let editorState = new CodeEditorState("console.log('Hello World');", 2, false);

  history.save(editorState);

  console.log('%cInitial State', COLORS.blue);
  editorState.displayState();

  editorState = editorState.copyWith({
    content: "console.log('Hello World'); \nconsole.log('New Line');",
    cursorPosition: 3,
    unsavedChanges: true,
  });

  history.save(editorState);

  console.log('%cAfter First Change', COLORS.blue);
  editorState.displayState();


  console.log('%cAfter moving the cursor', COLORS.blue);
  editorState = editorState.copyWith({cursorPosition: 5});
  history.save(editorState);
  editorState.displayState();

  console.log('%cAfter Undo', COLORS.blue);
  editorState = history.undo()!;
  editorState.displayState();

  console.log('%cAfter Redo', COLORS.blue);
  editorState = history.redo()!;
  editorState.displayState();
}


main();
