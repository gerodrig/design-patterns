/**
 * !Memento Pattern
 * Allows capturing and externalizing an object's internal state,
 * so that the object can be restored to that state later.
 *
 * * It is useful when you need to save the state of an object to be able
 * * to return to it in the future.
 *
 * https://refactoring.guru/design-patterns/memento
 */

import { COLORS } from '../helpers/colors.ts';

// A drawing board where shapes can be added

// Memento Class - DrawingMemento
class DrawingMemento {
    private shapes: string[];

    constructor(shapes: string[]) {
        // We save a copy of the shapes to avoid mutations
        this.shapes = [...shapes];
    }

    getShapes(): string[] {
        return [...this.shapes];
    }
}

// Originator Class - DrawingBoard
class DrawingBoard {
    private shapes: string[] = [];

    // Add a shape to the drawing board
    addShape(shape: string): void {
        this.shapes.push(shape);
        console.log(`Shape added: ${shape}`);
    }

    // Show the current state of the drawing board
    showBoard(): void {
        console.log('Current board:', this.shapes.join(', ') || 'Empty');
    }

    // Create a Memento of the current state of the drawing board
    save(): DrawingMemento {
        //* Implement the save method to save the current state
        return new DrawingMemento(this.shapes);
    }

    // Restore the state of the drawing board from a Memento
    restore(memento: DrawingMemento): void {
        this.shapes = memento.getShapes();
        console.log('%c\nDrawing board state restored.', COLORS.blue);
    }
}

// Caretaker Class - History
class History {
    private mementos: DrawingMemento[] = [];

    // Save a Memento
    //* Implement push to save in history
    push(memento: DrawingMemento): void {
        this.mementos.push(memento);
    }

    // Retrieve the last Memento
    //* Implement pop to retrieve the last memento
    pop(): DrawingMemento | undefined {
        return this.mementos.pop();
    }
}

// Client Code to test the Memento pattern

function main(): void {
    const drawingBoard = new DrawingBoard();
    const history = new History();

    // The user adds shapes and saves the state at each step
    drawingBoard.addShape('Circle');
    history.push(drawingBoard.save());

    drawingBoard.addShape('Square');
    history.push(drawingBoard.save());

    drawingBoard.addShape('Triangle');
    drawingBoard.showBoard(); // Show current state of the drawing board

    // Undo the last change
    drawingBoard.restore(history.pop()!);
    drawingBoard.showBoard(); // Show state after undo

    // Undo another change
    drawingBoard.restore(history.pop()!);
    drawingBoard.showBoard(); // Show state after undo again
}

main();