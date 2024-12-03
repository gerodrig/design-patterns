/**
 * ! Abstract Factory:
 * It is a design pattern that allows creating families of related objects
 * without specifying their concrete classes.
 *
 * Instead of creating individual objects directly,
 * we create factories that produce a set of related objects.
 *
 * * It is useful when you need to create objects that are part of a family
 * * and you want to ensure that these objects complement each other.
 *
 * https://refactoring.guru/design-patterns/abstract-factory
 */

/**
 * !Instructions:
  1. Complete the Product Classes:
  •	ElectricCar should implement Vehicle and display the message "Assembling an electric car".
  •	GasCar should implement Vehicle and display the message "Assembling a gas car".
  •	ElectricEngine should implement Engine and display the message "Starting electric engine".
  •	GasEngine should implement Engine and display the message "Starting gas engine".

  2. Complete the Factory Classes:
  •	ElectricVehicleFactory should create an ElectricCar and an ElectricEngine.
  •	GasVehicleFactory should create a GasCar and a GasEngine.

  3. Test the Code:
    •	Run the code to ensure that each factory produces the correct type of vehicle and engine.

 */
// 1. Interfaces for Vehicle and Engine
interface Vehicle {
    assemble(): void;
  }
  
  interface Engine {
    start(): void;
  }
  
  // 2. Concrete Product Classes
  
  class ElectricCar {
    // Implementation of the assemble method
    // 'Assembling an electric car'
  }
  
  class GasCar {
    // Implementation of the assemble method
    // 'Assembling a gas car'
  }
  
  class ElectricEngine {
    // Implementation of the start method
    // 'Starting electric engine'
  }
  
  class GasEngine {
    // Implementation of the start method
    // 'Starting gas engine'
  }
  
  // 3. Abstract Factory Interface
  
  interface VehicleFactory {
    createVehicle(): Vehicle;
    createEngine(): Engine;
  }
  
  // 4. Concrete Factory Classes
  
  class ElectricVehicleFactory implements VehicleFactory {
    // Implementation of the createVehicle and createEngine methods
  }
  
  class GasVehicleFactory implements VehicleFactory {
    // Implementation of the createVehicle and createEngine methods
  }
  
  // 5. Client Code
  
  function main(factory: VehicleFactory) {
    const vehicle = factory.createVehicle();
    const engine = factory.createEngine();
  
    vehicle.assemble();
    engine.start();
  }
  
  // Tests
  console.log('Creating electric vehicle:');
  main(new ElectricVehicleFactory());
  
  console.log('\nCreating gas vehicle:');
  main(new GasVehicleFactory());
  
  