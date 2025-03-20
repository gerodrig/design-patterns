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

/**
 * !Objective:
 * Implement the Visitor pattern in a vehicle management system
 * that allows performing specific operations on different
 * types of vehicles (cars, motorcycles, and trucks).
 *
 * These operations include calculating maintenance costs
 * and checking if vehicles comply with emission standards.
 */

import { COLORS } from '../helpers/colors.ts';

// Visitor Interface
interface Visitor {
  visitCar(car: Car): void;
  visitMotorcycle(motorcycle: Motorcycle): void;
  visitTruck(truck: Truck): void;
}

// Vehicle Interface
interface Vehicle {
  accept(visitor: Visitor): void;
}

// Concrete class - Car
class Car implements Vehicle {
  private year: number;
  private kilometers: number;

  constructor(year: number, kilometers: number) {
    this.year = year;
    this.kilometers = kilometers;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  accept(visitor: Visitor): void {
    //? Implement the accept method,
    // which calls the corresponding visitor method
    visitor.visitCar(this);
  }
}

// Concrete class - Motorcycle
class Motorcycle implements Vehicle {
  private year: number;
  private kilometers: number;

  constructor(year: number, kilometers: number) {
    this.year = year;
    this.kilometers = kilometers;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  accept(visitor: Visitor): void {
    //? Implement the accept method,
    // which calls the corresponding visitor method
    visitor.visitMotorcycle(this);
  }
}

// Concrete class - Truck
class Truck implements Vehicle {
  private year: number;
  private kilometers: number;
  private loadCapacity: number;

  constructor(year: number, kilometers: number, loadCapacity: number) {
    this.year = year;
    this.kilometers = kilometers;
    this.loadCapacity = loadCapacity;
  }

  getYear(): number {
    return this.year;
  }

  getKilometers(): number {
    return this.kilometers;
  }

  getLoadCapacity(): number {
    return this.loadCapacity;
  }

  accept(visitor: Visitor): void {
    //? Implement the accept method,
    // which calls the corresponding visitor method
    visitor.visitTruck(this);
  }
}

// Visitor class - MaintenanceCostVisitor
class MaintenanceCostVisitor implements Visitor {
  visitCar(car: Car): void {
    //? Calculate maintenance cost for the car
    // cost = Kilometers driven * 0.1 + (2024 - Year of manufacture) * 50
    const cost = car.getKilometers() * 0.1 + (2024 - car.getYear()) * 50;

    console.log(
      `Maintenance cost for the car: $${cost.toFixed(2)}`
    );
  }

  visitMotorcycle(motorcycle: Motorcycle): void {
    //? Calculate maintenance cost for the motorcycle
    // cost = Kilometers driven * 0.05 + (2024 - Year of manufacture) * 30
    const cost = motorcycle.getKilometers() * 0.05 + (2024 - motorcycle.getYear()) * 30;

    console.log(
      `Maintenance cost for the motorcycle: $${cost.toFixed(2)}`
    );
  }

  visitTruck(truck: Truck): void {
    //? Calculate maintenance cost for the truck
    // cost = Kilometers driven * 0.15 + Load capacity * 20 + (2024 - Year of manufacture) * 100
    const cost = truck.getKilometers() * 0.15 + truck.getLoadCapacity() * 20 + (2024 - truck.getYear()) * 100;

    console.log(`Maintenance cost for the truck: $${cost.toFixed(2)}`);
  }
}

// Visitor class - EmissionCheckVisitor
class EmissionCheckVisitor implements Visitor {
  visitCar(car: Car): void {
    //? Check if the car complies with emissions
    // passes = Year of manufacture > 2000 && Kilometers driven < 200_000
    const passes = car.getYear() > 2000 && car.getKilometers() < 200_000;
    console.log(`Car complies with emissions: ${passes ? 'Yes' : 'No'}`);
  }

  visitMotorcycle(motorcycle: Motorcycle): void {
    //? Check if the motorcycle complies with emissions
    // passes = Year of manufacture > 2005 && Kilometers driven < 100_000
    const passes = motorcycle.getYear() > 2005 && motorcycle.getKilometers() < 100_000;
    console.log(`Motorcycle complies with emissions: ${passes ? 'Yes' : 'No'}`);
  }

  visitTruck(truck: Truck): void {
    //? Check if the truck complies with emissions
    // passes = Year of manufacture > 2010 && Kilometers driven < 300_000
    const passes = truck.getYear() > 2010 && truck.getKilometers() < 300_000;
    console.log(`Truck complies with emissions: ${passes ? 'Yes' : 'No'}`);
  }
}

// ! Client Code
// ! No changes should be made here
function main(): void {
  const vehicles: Vehicle[] = [
    new Car(2018, 50_000),
    new Motorcycle(2015, 30_000),
    new Truck(2012, 250_000, 20),
  ];

  console.log('%c\nCalculating maintenance costs:', COLORS.green);
  const maintenanceVisitor = new MaintenanceCostVisitor();
  vehicles.forEach((vehicle) => vehicle.accept(maintenanceVisitor));

  console.log('%c\nChecking emissions:', COLORS.green);
  const emissionVisitor = new EmissionCheckVisitor();
  vehicles.forEach((vehicle) => vehicle.accept(emissionVisitor));
}

main();
