/**
 * ! Flyweight Pattern
 * It is a structural design pattern that allows us to use shared objects
 * to efficiently support large quantities of objects.
 *
 * * It is useful when we need a large number of objects and want to reduce
 * * the amount of memory they use.
 *
 * https://refactoring.guru/design-patterns/flyweight
 */

import { COLORS } from '../helpers/colors.ts';

interface Location {
  display(coords: { x: number; y: number }): void;
}

//? FlyWeight
class LocationIcon implements Location {
  private type: string;
  private iconImage: string;

  constructor(type: string, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }

  display(coords: { x: number; y: number }): void {
    console.log(
      `Coords: ${this.type} in ${coords.x}, ${coords.y} with icon %c[${this.iconImage}]`,
      COLORS.green
    );
  }
}

//? Flyweight Factory
class LocationFactory {
  private icons: Record<string, LocationIcon> = {};

  //? School, hospital, park
  getLocationIcon(type: string): LocationIcon {
    if (!this.icons[type]) {
      console.log(`%cCreating a new instance of the icon %c${type}`, COLORS.red, COLORS.blue);
      const iconImage = `image_about_${type.toLowerCase()}.png`;
      this.icons[type] = new LocationIcon(type, iconImage);
    }

    return this.icons[type];
  }
}

class MapLocation {
  private coords: { x: number; y: number };
  private icon: LocationIcon;

  constructor(x: number, y: number, icon: LocationIcon) {
    this.coords = { x, y };
    this.icon = icon;
  }

  display(): void {
    this.icon.display(this.coords);
  }
}

function main() {
  const factory = new LocationFactory();

  const locations = [
    new MapLocation(10, 20, factory.getLocationIcon('gym')),
    new MapLocation(10, 24, factory.getLocationIcon('gym')),
    new MapLocation(40, 60, factory.getLocationIcon('gym')),
    new MapLocation(40, 60, factory.getLocationIcon('park')),
    new MapLocation(40, 60, factory.getLocationIcon('hospital')),
    new MapLocation(40, 60, factory.getLocationIcon('hospital')),
    new MapLocation(40, 60, factory.getLocationIcon('park')),
    new MapLocation(40, 60, factory.getLocationIcon('school')),
    new MapLocation(40, 60, factory.getLocationIcon('school')),
    new MapLocation(40, 60, factory.getLocationIcon('park')),
    new MapLocation(40, 60, factory.getLocationIcon('school')),


];

  locations.forEach((location) => location.display());
}

main();
