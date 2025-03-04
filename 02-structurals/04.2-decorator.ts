/**
 * ! Decorator Pattern
 * It is a structural design pattern that allows adding
 * functionalities to objects by placing these objects inside
 * special wrapper objects that contain these functionalities.
 *
 * Do not confuse it with TypeScript decorators which are annotations.
 *
 * * It is useful when you need to add functionalities to objects
 *  * in a dynamic and flexible way.
 *
 * https://refactoring.guru/design-patterns/decorator
 */

// 1. Interface Character
interface Character {
    getDescription(): string;
    getStats(): { attack: number; defense: number };
}

// 2. Class BasicCharacter
// Represents a basic character without accessories
//* Implements the Character interface

class BasicCharacter implements Character {
    //* Implement the methods of the interface
    getDescription(): string {
        return 'Basic character 👤';
    }
    //* Implement the methods of the interface
    getStats(): { attack: number; defense: number } {
        return {
            attack: 10,
            defense: 10,
        };
    }
}

// 3. Decorator Class CharacterDecorator
// Acts as a base for specific decorators
abstract class CharacterDecorator implements Character {
    // Protected so that child classes can access the property
    // Private would not allow child classes to access the property
    //* Define the protected character property of type Character
    protected character: Character;

    //* Define the constructor that receives a character of type Character
    constructor(character: Character) {
        this.character = character;
    }

    //* Implement the methods of the Character interface, but returning
    // the description and statistics of the decorated character
    getDescription(): string {
        return this.character.getDescription();
    }

    //* Implement the methods of the Character interface
    getStats(): { attack: number; defense: number } {
        return this.character.getStats();
    }
}

// 4. Concrete Decorator HelmetDecorator
// Adds a helmet that increases defense by +5
class HelmetDecorator extends CharacterDecorator {
    override getDescription(): string {
        return this.character.getDescription() + '\n * with Helmet 🪖';
    }

    override getStats(): { attack: number; defense: number } {
        const stats = this.character.getStats();
        return { attack: stats.attack, defense: stats.defense + 5 };
    }
}

// 5. Concrete Decorator ShieldDecorator
// Adds a shield that increases defense by +10
class ShieldDecorator extends CharacterDecorator {
    override getDescription(): string {
        return this.character.getDescription() + '\n * with Shield 🛡️';
    }

    override getStats(): { attack: number; defense: number } {
        const stats = this.character.getStats();
        return { attack: stats.attack, defense: stats.defense + 10 };
    }
}

// 6. Concrete Decorator SwordDecorator
// Adds a sword that increases attack by +7
class SwordDecorator extends CharacterDecorator {
    override getDescription(): string {
        return this.character.getDescription() + '\n * with Sword 🗡️';
    }

    override getStats(): { attack: number; defense: number } {
        const stats = this.character.getStats();
        return { attack: stats.attack + 7, defense: stats.defense };
    }
}

//* Create a new decorator that adds a ring that increases attack by +3
// class RingDecorator ...
class RingDecorator extends CharacterDecorator {
    override getDescription(): string {
        return this.character.getDescription() + `\n * with Ring 💍`;
    }

    override getStats(): { attack: number; defense: number } {
        const stats = this.character.getStats();
        return { attack: stats.attack + 3, defense: stats.defense };
    }
}

// 7. Client Code to Test the Decorator

function main() {
    // Create a basic character
    let character: Character = new BasicCharacter();
    console.log('\nInitial Character:', character.getDescription());
    console.log('Statistics:', character.getStats());

    // Add a helmet to the character
    character = new HelmetDecorator(character);
    console.log('\nWith Helmet:', character.getDescription());
    console.log('Statistics:', character.getStats());

    // Add a shield to the character
    character = new ShieldDecorator(character);
    console.log('\nWith Shield:', character.getDescription());
    console.log('Statistics:', character.getStats());

    // Add a sword to the character
    character = new SwordDecorator(character);
    console.log('\nWith Sword:', character.getDescription());
    console.log('Statistics:', character.getStats());

    // Add a ring to the character
    character = new RingDecorator(character);
    console.log('\nWith Ring:', character.getDescription());
    console.log('Statistics:', character.getStats());

    console.log('\n\n');
}

main();
