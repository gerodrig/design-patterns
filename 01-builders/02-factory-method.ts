/**
 * ! Factory Method:
 * The Factory Method pattern allows creating objects without specifying
 * the exact class of the object that will be created.
 *
 * Instead, we delegate the creation of objects to subclasses or methods
 * that encapsulate this logic.
 *
 * * It is useful when a class cannot anticipate the class
 * * of objects it must create.
 *
 * https://refactoring.guru/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Taco {
    prepare(): void;
}

class SteakTaco implements Taco {
  prepare(): void {
    console.log('Preparing a %cSteak taco', COLORS.orange)
  }
    
}

class FishTaco implements Taco {
  prepare(): void {
    console.log('Preparing a %cFish taco', COLORS.blue)
  }
    
}

class BeanTaco implements Taco {
    prepare(): void {
        console.log('Preparing a %cBean taco ', COLORS.brown)
    }
}

abstract class Restaurant {

    abstract createTaco(): Taco;

    orderTaco():void {
        const taco = this.createTaco();
        taco.prepare();
    }
}

class BrazilianRestaurant extends Restaurant {

    override createTaco(): Taco {
      return new SteakTaco();
    }
}

class KrustyRestaurant extends Restaurant {
    override createTaco(): Taco {
      return new FishTaco();
    }
}

class MexicanRestaurant extends Restaurant {
    override createTaco(): Taco {
      return new BeanTaco();
    }
}

let restaurant: Restaurant;
function main(){

    const tacoType = prompt('What kind of taco would you like to order? (fish/steak/bean)')

    switch(tacoType){
        case 'steak':
            restaurant = new BrazilianRestaurant();
            break;
        case 'fish':
            restaurant = new KrustyRestaurant();
            break;
        case 'bean':
            restaurant = new MexicanRestaurant();
            break;
        default:
            console.log('%cInvalid option', COLORS.red)
    }

    restaurant.orderTaco();
}

main();