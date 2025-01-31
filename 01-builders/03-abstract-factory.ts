/**
 * ! Abstract Factory:
 * It is a design pattern that allows creating families of related objects
 * without specifying their concrete classes.
 *
 * Instead of creating individual objects directly,
 * we create factories that produce a set of related objects.
 *
 * * It is useful when you need to create objects that are part of a family
 * * and you want to ensure that these objects complement each other.
 *
 * https://refactoring.guru/design-patterns/abstract-factory
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * The purpose of the Abstract Factory is to create families of related objects
 * (in this case, burgers and drinks) without specifying the concrete classes
 * of each of these objects in the main code.
 */

interface Hamburger {
    prepare(): void;
}

interface Drink {
    pour(): void;
}

class ChickenHamburger implements Hamburger {
    prepare(): void {
      console.log('Cooking %cChicken hamburger', COLORS.yellow);
    }
}

class BeefHamburger implements Hamburger {
    prepare(): void {
      console.log('Cooking %cBeef hamburger', COLORS.red);
    }
}

class Water implements Drink {
    pour(): void {
        console.log('Pouring a glass of %cWater', COLORS.blue)
    }
}

class Beer implements Drink {
    pour(): void {
        console.log('Pouring a tin of %cBeer', COLORS.yellow);
    }
}

interface RestaurantFactory {
    createHamburger(): Hamburger;
    createDrink(): Drink;
}

class FastFoodRestaurantFactory implements RestaurantFactory {
  createHamburger(): Hamburger {
    return new BeefHamburger();
  }
  createDrink(): Drink {
    return new Beer();
  }
}

class HealthyRestaurantFactory implements RestaurantFactory {
    createHamburger(): Hamburger {
      return new ChickenHamburger();
    }
    createDrink(): Drink {
      return new Water();
    }
  }

  function main(factory: RestaurantFactory){
    const hamburger = factory.createHamburger();
    const drink = factory.createDrink();

    hamburger.prepare();
    drink.pour();
  }

console.log('\n%cRegular Menu Order', COLORS.green)
main(new FastFoodRestaurantFactory());

console.log('\n\n%cRegular Menu Order', COLORS.green)
main(new HealthyRestaurantFactory());

