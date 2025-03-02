/**
 * ! Singleton:
 * It is a creational design pattern that ensures a class
 * has a single instance and provides a global access point to it.
 *
 * * It is useful when you need to control access to a single instance
 * * of a class, such as in a database object or a
 * * configuration object.
 *
 * https://refactoring.guru/design-patterns/singleton
 */

import { COLORS } from '../helpers/colors.ts';

class Dragonballs {
    private static instance: Dragonballs;
    private ballsCollected: number;

    private constructor(){
        this.ballsCollected = 0;
    }

    public static getInstance(): Dragonballs {
        if(!Dragonballs.instance){
            Dragonballs.instance = new Dragonballs();
            console.log('%c Dragonballs have been created!', COLORS.orange);
        }

        return Dragonballs.instance;
    }

    collectBall(): void{
        if(this.ballsCollected < 7){
            this.ballsCollected++;
            console.log(`
                dragonball collected!. Total of dragonballs: ${this.ballsCollected}
                `)
                return;
        }
        console.log(
            `\n ${7 - this.ballsCollected} are needed to summon Shen-Long`
        )
    }

    summonShenlong(): void {
        if(this.ballsCollected === 7){
            console.log('Shenlong has been summoned, Say your wish')
            this.ballsCollected = 0;
            return;
        }

        console.log(
            `\n Not there yet ${ 7 - this.ballsCollected} are needed to summon Shenlong`
        )
    }
}

function main(){
    const gokuDragonBalls = Dragonballs.getInstance();

    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();
    gokuDragonBalls.collectBall();
  
    gokuDragonBalls.summonShenlong();
  
    const vegetaDragonBalls = Dragonballs.getInstance();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
    vegetaDragonBalls.collectBall();
  
    gokuDragonBalls.summonShenlong();
  
    vegetaDragonBalls.summonShenlong();
}

main();