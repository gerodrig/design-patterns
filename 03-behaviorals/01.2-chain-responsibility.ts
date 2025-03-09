/**
 * ! Chain of Responsibility Pattern
 * It is a behavioral design pattern that allows you to pass requests
 * along a chain of handlers.
 *
 * * It is useful when you need to process data in different ways, but you
 * * do not know in advance what type of processing is needed or in what order,
 * * but you know that it needs to be processed in a sequence.
 */

import { COLORS } from '../helpers/colors.ts';

// 1. Approver Interface
interface Approver {
    setNext(approver: Approver): Approver;
    approveRequest(amount: number): void;
}

// 2. Abstract BaseApprover Class to handle the chain
abstract class BaseApprover implements Approver {
    private nextApprover: Approver | null = null;

    setNext(approver: Approver): Approver {
        this.nextApprover = approver;
        return approver;
    }

    //! This method must be implemented by subclasses.
    abstract approveRequest(amount: number): void;

    protected next(amount: number): void {
        if (this.nextApprover) {
            this.nextApprover.approveRequest(amount);
            return;
        }

        console.log('Request could not be approved.');
    }
}

// 3. Concrete Approver Classes

class Supervisor extends BaseApprover {
    //? Implement the approveRequest method if the amount is less than or equal to 1000
    //? If the amount is greater than 1000, pass the request to the next approver
    override approveRequest(amount: number): void {
        if (amount <= 1000) {
            console.log(
                `%cSupervisor approving request %cTotal: ${amount}}`,
                COLORS.orange,
                COLORS.yellow
            );
            return;
        }

        this.next(amount);
    }
}

class Manager extends BaseApprover {
    //? Implement the approveRequest method if the amount is less than or equal to 5000
    //? If the amount is greater than 5000, pass the request to the next approver

    override approveRequest(amount: number): void {
        if (amount <= 5000) {
            console.log(
                `%cManager approving request %cTotal: ${amount}}`,
                COLORS.green,
                COLORS.yellow
            );
            return;
        }

        this.next(amount);
    }
}

class Director extends BaseApprover {
    //? Implement the approveRequest method if the amount
    override approveRequest(amount: number): void {
        if (amount <= 25000) {
            console.log(
                `%cDirector approving request %cTotal: ${amount}}`,
                COLORS.blue,
                COLORS.yellow
            );
            return;
        }

        this.next(amount);
    }
}

class VP extends BaseApprover {
    override approveRequest(amount: number): void {
        console.log(
            `%cVP approving request %cTotal: ${amount}}`,
            COLORS.pink,
            COLORS.yellow
        );
        return;
    }
}

// 4. Client Code to test the chain of responsibility

function main() {
    //* Supervisor approval <= 1000
    const supervisor = new Supervisor();
    //* Manager approval <= 5000
    const manager = new Manager();
    //* Director approval <= 25000
    const director = new Director();
    //* VP approval All
    const vp = new VP();

    // Configure the chain of responsibility
    supervisor.setNext(manager).setNext(director).setNext(vp);

    // Test different purchase requests
    console.log('Purchase request of $500:');
    supervisor.approveRequest(500);

    console.log('\nPurchase request of $3000:');
    supervisor.approveRequest(3000);

    console.log('\nPurchase request of $7000:');
    supervisor.approveRequest(7000);

    console.log('\nPurchase request of $27000:');
    supervisor.approveRequest(27000);
}

main();
