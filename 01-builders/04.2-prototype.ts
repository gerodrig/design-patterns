/**
 * ! Prototype Pattern:

 * It is a creational design pattern that allows us to copy existing objects without making
 * the code dependent on their classes.
 * 
 * * It is useful when we want to duplicate the content, 
 * * the title, and the author of a document, for example, or any complex object.
 * 
 * https://refactoring.guru/design-patterns/prototype
 */

class Pokemon {
  name: string;
  type: string;
  level: number;
  attacks: string[];

  constructor(name: string, type: string, level: number, attacks: string[]) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.attacks = attacks;
  }

  // Method to clone the Pokémon
  clone(): Pokemon {
    // The attacks should avoid being passed by reference, meaning they should not be the same array.
    // Complete: Should return a new Pokémon with the same attributes
    return new Pokemon(this.name, this.type, this.level, [...this.attacks]);
  }

  displayInfo(): void {
    console.log(
      `Name: ${this.name}\nType: ${this.type}\nLevel: ${
        this.level
      }\nAttacks: ${this.attacks.join(', ')}`
    );
  }
}

// Task:
// 1. Create a base Pokémon.
// 2. Clone the base Pokémon and modify some attributes in the clones.
// 3. Call displayInfo on each Pokémon to show their details.

// Example:
// const basePokemon = new Pokemon("Charmander", "Fire", 1, ["Flamethrower", "Scratch"]);
// const clone1 = basePokemon.clone();
// clone1.name = "Charmeleon";
// clone1.level = 16;
// clone1.attacks.push("Flame Burst");

// basePokemon.displayInfo(); // "Flame Burst" should not appear here
// clone1.displayInfo();

function main() {
  const basePokemon = new Pokemon('Pikachu', 'Electric', 50, [
    'Thunderbolt',
    'Surf',
  ]);

  const clonedPokemon = basePokemon.clone();
  clonedPokemon.name = 'Raichu';
  clonedPokemon.level = 100;
  clonedPokemon.attacks.push('Thunder');

  basePokemon.displayInfo();
  clonedPokemon.displayInfo();
}


main();