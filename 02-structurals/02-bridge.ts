/**
 * ! Bridge Pattern
 * This pattern allows us to decouple an abstraction from its implementation,
 * so that both can vary independently.
 *
 * * It is useful when there are multiple implementations of an abstraction
 * * It can be used to separate business logic from presentation logic
 * * It can also be used to separate user interface logic.
 *
 * https://refactoring.guru/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";

interface Ability {
    use(): void;
}

class SwordAttack implements Ability{
    use(): void {
    console.log(`Attacks with a 🗡️ %c fiercely.`, COLORS.blue)
    }
}

class AxeAttack implements Ability{
    use(): void {
    console.log(`Attacks with an 🪓 %c viciously.`, COLORS.orange)
    }
}

class MagicSpell implements Ability {
    use(): void {
        console.log(`Casts a %cpowerful spell 🪄`, COLORS.pink)
    }
}

class FireBallSpell implements Ability {
    use(): void {
        console.log(`Casts a %cmelting fireball 🔥`, COLORS.red)
    }
}

abstract class Character {
    protected ability: Ability;

    constructor(ability: Ability){
        this.ability = ability;
    }

    setAbility(ability: Ability):void {
        this.ability = ability;
    }

   abstract performAbility(): void; 
}

class Warrior extends Character {
  override performAbility(): void {
    console.log('\nThe Warrior is ready for battle!')
    this.ability.use();
  }
}

class Mage extends Character {
  override performAbility(): void {
    console.log('\nThe Mage is ready to curse!')
    this.ability.use();
  }
}

function main(){
    const warrior = new Warrior(new SwordAttack());
    warrior.performAbility();


   warrior.setAbility(new AxeAttack());
   warrior.performAbility();

   const mage = new Mage(new MagicSpell());
   mage.performAbility();

   mage.setAbility(new FireBallSpell());
   mage.performAbility();
}


main();