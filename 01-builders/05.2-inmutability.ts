/**
 * ! Immutability with copy
 * Although immutability is a good practice, it is not always possible.
 * In these cases, a copy of the object can be made and the copy modified.
 *
 *  * It is useful for maintaining a history of states in interactive applications.
 *
 */

/**
 1. Complete the copyWith method in the Player class to allow 
 creating a copy with changes in name, score, or level.
 
 2. Use the client code to test the functionality of copyWith, 
 making changes to the player's score, level, and name.
 */

 import { COLORS } from '../helpers/colors.ts';

 interface PlayerProps {
   name: string;
   score: number;
   level: number;
 }
 
 // 1. Clase Player inmutable
 class Player {
   readonly name: string;
   readonly score: number;
   readonly level: number;
 
   constructor({ level, name, score }: PlayerProps) {
     this.name = name;
     this.score = score;
     this.level = level;
   }
 
   // Método copyWith para crear una copia modificada del jugador
   copyWith({ name, score, level }: Partial<Player>): Player {
     return new Player({
       level: level ?? this.level,
       name: name ?? this.name,
       score: score ?? this.score,
     });
   }
 
   displayState(): void {
     console.log(`\n%cPlayer: ${this.name}`, COLORS.green);
     console.log(`%cScore: ${this.score}`, COLORS.yellow);
     console.log(`%cLevel: ${this.level}`, COLORS.blue);
   }
 }
 
 // 2. Código Cliente para probar
 function main() {
   // Crear jugador inicial
   let player = new Player({
     level: 1,
     name: 'Carlos',
     score: 0,
   });
   console.log('Initial State:');
   player.displayState();
 
   // Incrementar el puntaje
   player = player.copyWith({ score: 10 });
   console.log('\nAfter increasing the score:');
   player.displayState();
 
   // Subir de nivel
   player = player.copyWith({ level: 2 });
   console.log('\nAfter leveling up:');
   player.displayState();
 
   // Cambiar el nombre del jugador
   player = player.copyWith({ name: 'Carlos Pro' });
   console.log('\nAfter changing name:');
   player.displayState();
 }
 
 main();