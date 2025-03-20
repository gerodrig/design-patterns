/**
 * ! Strategy Pattern
 *
 * The Strategy pattern is a software design pattern that defines a
 * family of algorithms, encapsulates them, and makes them interchangeable.
 *
 *
 * * It is useful when you have a class that has behavior that can
 * * change at runtime and you want to delegate the responsibility of
 * * the implementation to another class.
 *
 * https://refactoring.guru/design-patterns/strategy
 */

import { COLORS } from '../helpers/colors.ts';

/**
 * !Objective: Explain the Strategy pattern using an example where several
 * ! ducks compete in a race and each one has its own
 * ! movement strategy (e.g., swimming, flying, or walking).
 */

interface MovementStrategy {
  move(): void;
}

//?  Strategy #1 - Costly movement strategy but fast
class SwimFast implements MovementStrategy {
  move(): void {
    console.log('%cThe duck is swimming fast\n', COLORS.blue);
  }
}

//? Strategy #2 - normal movement strategy but cheap
class FlyFast implements MovementStrategy {
  move(): void {
    console.log('%cThe duck is flying fast\n', COLORS.pink);
  }
}

//? Strategy #3 - Slow movement strategy but cheap
class WalkSlow implements MovementStrategy {
  move(): void {
    console.log('%cThe duck is walking slow\n', COLORS.green);
  }
}

//? Context
class Duck {
  constructor(
    private name: string,
    private movementStrategy: MovementStrategy
  ) {
    console.log(`%c${name} is ready to race`, COLORS.yellow);
  }

  performMove(): void {
    console.log(`%c${this.name} is moving`, COLORS.yellow);
    this.movementStrategy.move();
  }

  setMovementStrategy(strategy: MovementStrategy): void {
    this.movementStrategy = strategy;
    console.log(
      `%c${this.name} is now using a new movement strategy`,
      COLORS.yellow
    );
  }
}

function main(){
    const duck1 = new Duck('Quick Duck', new SwimFast());
    const duck2 = new Duck('Flying Duck', new FlyFast());
    const duck3 = new Duck('Rubber Duck', new WalkSlow());

    console.log('%cDuck Race Starts', COLORS.red);
    duck1.performMove();
    duck2.performMove();
    duck3.performMove();
    

    duck3.setMovementStrategy(new FlyFast());
    duck3.performMove();

    duck3.setMovementStrategy(new SwimFast());
    duck3.performMove();
};

main();