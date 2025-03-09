/**
 * ! Flyweight Pattern
 * It is a structural design pattern that allows us to use shared objects
 * to efficiently support large quantities of objects.
 *
 * * It is useful when we need a large number of objects and want to reduce
 * * the amount of memory they use.
 */

import { COLORS } from '../helpers/colors.ts';

// 1. Class that represents the type of bullet - BulletType (Flyweight)
class BulletType {
  private name: string;
  private damage: number;
  private color: string;

  constructor(name: string, damage: number, color: string) {
    this.name = name;
    this.damage = damage;
    this.color = color;
  }

  getName(): string {
    return this.name;
  }

  getDamage(): number {
    return this.damage;
  }

  getColor(): string {
    return this.color;
  }
}

// 2. Flyweight Factory - BulletTypeFactory
class BulletTypeFactory {
  private bulletTypes: Record<string, BulletType> = {};

  getBulletType(name: string, damage: number, color: string): BulletType {
    //? : Implement a method to get a bullet type
    // If the bullet type does not exist, create it and save it in the list of bullet types
    const key = `${name}-${damage}-${color}`;

    if (!this.bulletTypes[key]) {
      //! console log with red every time an instance is created
      console.log(`%cCreating new instance of bullet type ${key}`, COLORS.red);

      this.bulletTypes[key] = new BulletType(name, damage, color);
    }
    // If the bullet type exists, return it

    //? The key should be a unique identifier for each bullet type
    // name-damage-color

    return this.bulletTypes[key];
  }
}

// 3. Class that represents a Bullet - Bullet
class Bullet {
  private x: number;
  private y: number;
  private direction: number;
  private bulletType: BulletType;

  constructor(x: number, y: number, direction: number, bulletType: BulletType) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.bulletType = bulletType;
  }

  display(): void {
    const text = `
      Bullet type: %c"${this.bulletType.getName()}" 
      %cCoords: (${this.x}, ${this.y})
      Direction: ${this.direction}
      Damage: ${this.bulletType.getDamage()} 
      Color: ${this.bulletType.getColor()}
    `;

    console.log(text, COLORS.green, COLORS.white);
  }
}

// 4. Shooting System

class ShootingSystem {
  private bullets: Bullet[] = [];
  private factory: BulletTypeFactory;

  constructor(factory: BulletTypeFactory) {
    this.factory = factory;
  }

  shoot(
    x: number,
    y: number,
    direction: number,
    type: string,
    damage: number,
    color: string
  ): void {
    const bulletType = this.factory.getBulletType(type, damage, color);
    const bullet = new Bullet(x, y, direction, bulletType);
    this.bullets.push(bullet);
    bullet.display();
  }

  getBulletCount(): number {
    return this.bullets.length;
  }
}

// 5. Client Code to test the Flyweight

function main() {
  const factory = new BulletTypeFactory();
  const shootingSystem = new ShootingSystem(factory);

  // Shoot several bullets of different types
  shootingSystem.shoot(10, 20, 0, 'Pistol', 10, 'Gray');
  shootingSystem.shoot(15, 25, 90, 'Shotgun', 20, 'Red');
  shootingSystem.shoot(20, 30, 180, 'Rifle', 15, 'Green');
  shootingSystem.shoot(10, 20, 45, 'Pistol', 10, 'Gray');
  shootingSystem.shoot(25, 35, 270, 'Shotgun', 20, 'Red');

  console.log(
    `Total bullets shot: %c${shootingSystem.getBulletCount()}\n`,
    COLORS.yellow
  );
}

main();
