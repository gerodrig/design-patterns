/**
 * ! Composite Pattern
 * It is a structural design pattern that allows composing objects
 * into tree structures to represent hierarchies.
 *
 * The pattern allows clients to treat individual objects
 * and their compositions uniformly.
 *
 * * It is useful when you need to treat individual objects
 * * and their compositions uniformly, and the structure
 * * of the objects forms a tree hierarchy.
 *
 * https://refactoring.guru/design-patterns/composite
 *
 */

import { COLORS } from '../helpers/colors.ts';

// 1. MenuComponent Interface
// Defines the `showDetails` method, which will be implemented by menu items and categories.
interface MenuComponent {
    showDetails(indent?: string): void;
}

// 2. MenuItem Class
// Represents an individual menu item, such as a dish or a drink.
class MenuItem implements MenuComponent {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  showDetails(indent: string = ''): void {
    console.log(
      `${indent}- ${this.name}: %c$${this.price.toFixed(2)}`,
      COLORS.green
    );
  }
}

// 3. MenuCategory Class
// Represents a menu category that can contain other items or subcategories.
class MenuCategory implements MenuComponent {
//* Create two private properties: name and items
// Name string and items array of MenuComponent
// Name is received in the constructor, items is initialized as an empty array
  private name: string;
  private items: MenuComponent[] = [];

  constructor(name: string){
    this.name = name;
  }

//* Operator overloading - Item can be MenuComponent or an array of MenuComponent
  add(item: MenuComponent | MenuComponent[]): void {
    //* Implement operator overloading
    if(Array.isArray(item)){
        this.items.push(...item);
        return;
    }

    this.items.push(item);
  }

  showDetails(indent: string = ''): void {
    console.log(`%c${indent}+ ${this.name}`, COLORS.blue);
    
    this.items.forEach((item) => item.showDetails(indent + ' '))
  }
}

// 4. Client Code to Test the Composite
// Should see the correct menu structure
function main() {
    // Create individual items
    const salad = new MenuItem('Salad', 5.99);
    const soup = new MenuItem('Tomato Soup', 4.99);
    const steak = new MenuItem('Steak', 15.99);
    const soda = new MenuItem('Soda', 2.5);
    const dessert = new MenuItem('Chocolate Cake', 6.5);
    const coffee = new MenuItem('Coffee', 1.99);

    // Create menu categories and add items
    const appetizers = new MenuCategory('Appetizers');
    appetizers.add(salad);
    appetizers.add(soup);

    const mainCourse = new MenuCategory('Main Course');
    mainCourse.add(steak);

    const beverages = new MenuCategory('Beverages');
    beverages.add(soda);
    beverages.add(coffee);

    const desserts = new MenuCategory('Desserts');
    desserts.add(dessert);

    // Create a main menu that contains all categories
    const mainMenu = new MenuCategory('Main Menu');
    mainMenu.add([appetizers, beverages, desserts, mainCourse]);

    // Display the complete menu structure
    console.log('Restaurant Menu:');
    mainMenu.showDetails();
}

main();
