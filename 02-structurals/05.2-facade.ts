/**
 * ! Facade Pattern
 * This pattern provides a unified interface to a set of interfaces
 * in a subsystem.
 *
 * Facade defines a higher-level interface that makes the subsystem
 * easier to use.
 *
 * * It is useful when a subsystem is complex or difficult to understand
 * * to provide a simplified interface for the client.
 *
 * https://refactoring.guru/design-patterns/facade
 */

// !Task: Computer Boot System using the Facade Pattern

import { COLORS } from '../helpers/colors.ts';

// 1. Subsystem Classes

class CPU {
    stopOperations(): void {
        console.log('CPU: Stopping operations. 🛑');
    }

    jump(position: number): void {
        console.log(`CPU: Jumping to memory position ${position}. 🏃`);
    }

    execute(): void {
        console.log('CPU: Executing instructions. 🖥️');
    }
}

class HardDrive {
    read(position: number, size: number): string {
        console.log(
            `HardDrive: Reading ${size} bytes from position ${position}. 📀`
        );
        return '001010001010100';
    }

    close() {
        console.log('HardDrive: Stopping hard drive. 💽');
    }
}

class Memory {
    load(position: number, data: string): void {
        console.log(`Memory: Loading data at position ${position} ${data}. 💾`);
    }

    free(): void {
        console.log('Memory: Freeing memory. 🧹');
    }
}

// 2. Facade Class - ComputerFacade

class ComputerFacade {
    //* Add necessary attributes CPU, Memory, and HardDrive
    private cpu: CPU;
    private hdd: HardDrive;
    private memory: Memory;

    //* Add constructor to instantiate CPU, Memory, and HardDrive attributes
    constructor() {
        this.cpu = new CPU();
        this.hdd = new HardDrive();
        this.memory = new Memory();
    }

    startComputer(): void {
        console.log('\n%cStarting the computer...', COLORS.cyan);

        //* execute necessary operations to start the computer
        // 1. Load the operating system into memory - memory.load(0, hardDrive.read(0, 1024))
        this.memory.load(0, this.hdd.read(0, 1024));
        // 2. Jump to memory position 0 - cpu.jump(0)
        this.cpu.jump(0);
        // 3. Execute CPU instructions - cpu.execute()
        this.cpu.execute();

        console.log('Computer ready to use. ✅\n');
    }

    shutDownComputer(): void {
        console.log('\n%cShutting down the computer...', COLORS.red);
        console.log('Closing processes and saving data... 💾');

        //* execute necessary operations to shut down the computer
        // 1. Stop CPU operations - cpu.stopOperations()
        this.cpu.stopOperations();
        // 2. Free the memory - memory.free()
        this.memory.free();
        // 3. Close the hard drive - hardDrive.close()
        this.hdd.close();

        console.log('Computer shut down. 📴\n');
    }
}

// 3. Client Code to Use the Facade
//  Nothing to do here, it should start and shut down the computer without issues
function main() {
    const computer = new ComputerFacade();

    // Start the computer using the facade
    computer.startComputer();

    // Shut down the computer using the facade
    computer.shutDownComputer();
}

main();
