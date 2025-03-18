/**
 * ! State Pattern
 * This pattern allows an object to change its behavior
 * when its internal state changes.
 *
 * * It is useful when an object has behavior that depends on its state
 * * and must change its behavior at runtime depending on that state.
 *
 * https://refactoring.guru/design-patterns/state
 */

import { COLORS } from '../helpers/colors.ts';
import { sleep } from '../helpers/sleep.ts';

/**
 * * Objective: Implement the State pattern to simulate the operation
 * * of a vending machine.
 * * The machine has different states,
 *  * such as Waiting for Money,
 *  * Selecting Product,
 *  * Dispensing Product,
 * * and its behavior varies depending on the current state.
 */

interface State {
  name: string;

  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  constructor(private state: State = new WaitingForMoney(this)) {}

  insertMoney() {
    this.state.insertMoney();
  }

  selectProduct() {
    this.state.selectProduct();
  }

  dispenseProduct() {
    this.state.dispenseProduct();
  }

  setState(newState: State) {
    this.state = newState;
    console.log(`The state changed to: %c${newState.name}`, COLORS.yellow);
  }

  getStateName(): string {
    return this.state.name;
  }
}

//? States
class WaitingForMoney implements State {
  public name: string = 'Waiting for Money';

  constructor(private vendingMachine: VendingMachine) {}

  insertMoney(): void {
    console.log('Money inserted: %cNow you can select a product', COLORS.green);
    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }
  selectProduct(): void {
    console.log('%cYou must insert money first', COLORS.red);
  }
  dispenseProduct(): void {
    console.log('%cYou must insert money first', COLORS.red);
  }
}

class ProductSelected implements State {
  public name: string = 'Selecting Product';

  constructor(private vendingMachine: VendingMachine) {}

  insertMoney(): void {
    console.log('%cPlease select a product - Money inserted', COLORS.red);
  }
  selectProduct(): void {
    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }
  dispenseProduct(): void {
    console.log('%c Please select a product - before dispatching', COLORS.red);
  }
}

class DispensingProduct implements State {
  public name: string = 'Dispatching Product';

  constructor(private vendingMachine: VendingMachine) {}

  insertMoney(): void {
    console.log('%cPlease wait for product to be dispatched', COLORS.red);
  }
  selectProduct(): void {
    console.log('%cProduct selected and dispatching', COLORS.red);
  }
  dispenseProduct(): void {
    console.log(
      '%cProducts dispatched, Changing state to Waiting for Money',
      COLORS.green
    );

    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectedOption: string | null = '4';

  do {
    console.clear();
    console.log(
      `Please select an option: %c${vendingMachine.getStateName()}`,
      COLORS.blue
    );

    selectedOption = prompt(
      `
                1. Insert money.
                2. Select Product. 
                3. Dispense Product.
                4. Exit

                option: `
    );

    switch (selectedOption) {
      case '1':
        vendingMachine.insertMoney();
        break;
      case '2':
        vendingMachine.selectProduct();
        break;
      case '3':
        vendingMachine.dispenseProduct();
        break;
      case '4':
        console.log('Exiting system');
        break;
      default:
        console.log('Invalid Option');
    }
    await sleep(3000);
  } while (selectedOption !== '4');
}

main();