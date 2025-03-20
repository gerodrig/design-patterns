/**
 * !Visitor Pattern
 *
 * The Visitor pattern is a behavioral design pattern
 * that allows you to separate algorithms from the objects
 * on which they operate.
 *
 * * It is useful when you need to add new operations to
 * * stable classes without changing their code.
 *
 * https://refactoring.guru/design-patterns/visitor
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Context: Imagine you are designing a system for a theme
 * park with different types of attractions:
 * roller coasters, haunted houses, and ferris wheels.
 *
 * Each attraction has its own entry price and offers a discount
 * depending on the type of visitor (child, adult, or senior).
 *
 * This is where the Visitor pattern comes in, which allows applying
 * specific operations (such as calculating the discounted price) depending
 * on both the attraction and the type of visitor,
 * without modifying the original classes.
 */

interface Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void;
    visitHauntedHouse(hauntedHouse: HauntedHouse): void;
    visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
    accept(visitor: Visitor): void;
}

class RollerCoaster implements Attraction {
    constructor(private price: number = 50) {}

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitRollerCoaster(this);
    }
}

class HauntedHouse implements Attraction {
    constructor(private price: number = 30) {}

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitHauntedHouse(this);
    }
}

class FerrisWheel implements Attraction {
    constructor(private price: number = 20) {}

    getPrice(): number {
        return this.price;
    }

    accept(visitor: Visitor): void {
        visitor.visitFerrisWheel(this);
    }
}

//? Visitor implementation

class ChildVisitor implements Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`%cChild price for Roller Coaster: ${rollerCoaster.getPrice() * 0.5}`, COLORS.green);
    }

    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`%cChild price for Haunted House: ${hauntedHouse.getPrice() * 0.5}`, COLORS.green);
    }

    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`%cChild price for Ferris Wheel: ${ferrisWheel.getPrice() * 0.5}`, COLORS.green);
    }
}

class AdultVisitor implements Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`%cAdult price for Roller Coaster: ${rollerCoaster.getPrice()}`, COLORS.yellow);
    }

    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`%cAdult price for Haunted House: ${hauntedHouse.getPrice()}`, COLORS.yellow);
    }

    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`%cAdult price for Ferris Wheel: ${ferrisWheel.getPrice()}`, COLORS.yellow);
    }
}

class SeniorVisitor implements Visitor {
    visitRollerCoaster(rollerCoaster: RollerCoaster): void {
        console.log(`%cSenior price for Roller Coaster: ${rollerCoaster.getPrice() * 0.75}}`, COLORS.orange);
    }

    visitHauntedHouse(hauntedHouse: HauntedHouse): void {
        console.log(`%cSenior price for Haunted House: ${hauntedHouse.getPrice() * 0.75}`, COLORS.orange);
    }

    visitFerrisWheel(ferrisWheel: FerrisWheel): void {
        console.log(`%cSenior price for Ferris Wheel: ${ferrisWheel.getPrice() * 0.75}}`, COLORS.orange);
    }
}

function main() {
    const rollerCoaster = new RollerCoaster();
    const hauntedHouse = new HauntedHouse();
    const ferrisWheel = new FerrisWheel();

    const childVisitor = new ChildVisitor();
    const adultVisitor = new AdultVisitor();
    const seniorVisitor = new SeniorVisitor();

    rollerCoaster.accept(childVisitor);
    hauntedHouse.accept(adultVisitor);
    ferrisWheel.accept(seniorVisitor);
}

main();