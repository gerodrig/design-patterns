/**
 * ! Proxy Pattern
 * This pattern is used to control access to an object, that is,
 * an object is created that acts as an intermediary between the client and the real object.
 *
 * * It is useful when we need to control access to an object,
 * * for example, to check if the client has permission
 * * to access certain methods or properties.
 *
 * https://refactoring.guru/design-patterns/proxy
 *
 */

import { COLORS } from '../helpers/colors.ts';

class Player {
  constructor(public name: string, public level: number) {}
}

interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`%c Welcome to the secret room, ${player.name}`, COLORS.blue);
    console.log(`%c An enemy is waiting for you`, COLORS.yellow);
  }
}

//? Proxy Class - Magic Portal

class MagicPortal implements Room {
  constructor(private secretRoom: Room) {}

  enter(player: Player): void {
    if (player.level >= 10) {
      this.secretRoom.enter(player);
      return;
    }

    console.log(
      `
            %c Sorry ${player.name}, Your level ${player.level} is too low, you need a level 10 to access
            `,
      COLORS.red
    );
  }
}

function main(){

    const portal = new MagicPortal(new SecretRoom()) //Proxy

    const player1 = new Player('Mimicita', 15);
    const player2 = new Player('Benito', 9);

    console.log(`Player2 tries to enter the portal`, COLORS.blue);
    portal.enter(player2);

    console.log(`\nPlayer1 tries to enter the portal`, COLORS.yellow);
    portal.enter(player1);
}


main();
