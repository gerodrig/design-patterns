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

class GameCheckpoint {
  constructor(
    private level: number,
    private health: number,
    private position: string
  ) {}

  getLevel() {
    return this.level;
  }

  getHealth() {
    return this.health;
  }

  getPosition() {
    return this.position;
  }
}

class Game {
  constructor(
    private level: number = 1,
    private health: number = 100,
    private position: string = 'start'
  ) {
    console.log(`
            Playing in level ${this.level}
                health: ${this.health}
                position: ${this.position}
            `);
  }

  save(): GameCheckpoint {
    return new GameCheckpoint(this.level, this.health, this.position);
  }

  play(level: number, health: number, position: string): void {
    this.level = level;
    this.health = health;
    this.position = position;

    console.log(`
        Playing in level ${this.level}
            health: ${this.health}
            position: ${this.position}
        `);
  }

  restore(checkpoint: GameCheckpoint): void {
    this.level = checkpoint.getLevel();
    this.health = checkpoint.getHealth();
    this.position = checkpoint.getPosition();

    console.log(
      `
        %cProgress restored
        
        %cgame restored to level ${this.level}
            health: ${this.health}
            position: ${this.position}
        `,
      COLORS.orange,
      COLORS.blue
    );
  }
}

class GameHistory {
  private checkpoint: GameCheckpoint[] = [];

  push(checkpoint: GameCheckpoint) {
    this.checkpoint.push(checkpoint);
  }

  pop(): GameCheckpoint | null {
    return this.checkpoint.pop() ?? null;
  }
}

function main() {
  const game = new Game();
  const history = new GameHistory();

  history.push(game.save());

  //Player continues with story
  game.play(2, 90, 'Enchanted Forest');
  history.push(game.save());

  game.play(3, 70, 'Dark Cave');
  history.push(game.save());

  game.play(4, 50, "Dragon's lair");
  console.log('%c\nCurrent State', COLORS.green);

  game.restore(history.pop()!);
  console.log('%c\n After restoring the last saved state', COLORS.green);
  
  game.restore(history.pop()!);
  console.log('%c\n After restoring the last saved state', COLORS.green);
}

main();
