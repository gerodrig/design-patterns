/**
 * ! Builder Pattern:
 * It is a creational design pattern that allows us to construct complex objects
 * step by step.
 *
 * The pattern allows us to produce different types and representations
 * of an object using the same construction code.
 *
 * * It is useful when we need to construct a complex object with many parts
 * * and we want the construction process to be independent of the parts
 * * that compose it.
 *
 * https://refactoring.guru/design-patterns/builder
 */
import { COLORS } from '../helpers/colors.ts';

class Computer {
  public cpu: string = 'cpu - not defined';
  public ram: string = 'ram - not defined';
  public storage: string = 'storage - not defined';
  public gpu?: string;

  displayConfiguration(): void {
    console.log(`
            CPU: ${this.cpu}
            RAM: ${this.ram}
            Storage: ${this.storage}
            GPU: ${this.gpu ?? 'gpu - not defined'}
            `);
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;
    return this;
  }

  build(): Computer {
    return this.computer;
  }
}

function main() {
  const basicComputer = new ComputerBuilder()
    .setCPU('i5')
    .setRAM('16GB')
    .setStorage('1TB')
    .build();

  const macProComputer = new ComputerBuilder()
    .setCPU('M4 Pro')
    .setRAM('64GB')
    .setStorage('2TB')
    .setGPU('M4')
    .build();

  //? Display mac pro computer configuration
  console.log('%cMac Pro Computer Configuration:', COLORS.yellow);
  macProComputer.displayConfiguration();

  //? Display basic computer configuration
  console.log('%cComputer Configuration:', COLORS.blue);
  basicComputer.displayConfiguration();
}

main();
