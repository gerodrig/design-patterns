/**
 * ! Singleton:
 * It is a creational design pattern that ensures a class
 * has a single instance and provides a global access point to it.
 *
 * * It is useful when you need to control access to a single instance
 * * of a class, such as in a database object or a configuration object.
 */

import { COLORS } from '../helpers/colors.ts';

class DatabaseConnection {
    private static instance: DatabaseConnection;
    private connected: boolean = false;

    // Private constructor to prevent direct instances
    private constructor() {}

    // Static method to get the unique instance
    public static getInstance(): DatabaseConnection {
        // To be completed: implement the Singleton pattern
        if(!DatabaseConnection.instance){
            DatabaseConnection.instance = new DatabaseConnection();
            console.log(`\n%cDatabase connection instance created`, COLORS.green);
        }

        return DatabaseConnection.instance;

    }

    // Method to connect to the database
    public connect(): void {
        if(this.connected){
            console.log(`%cDatabase connection already established`, COLORS.yellow)
            return;
        }

        this.connected = true;
        console.log(`%cConnection established to the database`, COLORS.green);


    }

    // Method to disconnect from the database
    public disconnect(): void {
        // To be completed: disconnect and show disconnection message
        if(this.connected){
            this.connected = false;
            console.log(`%cDatabase connection has been terminated`, COLORS.red);
            return;
        }

        console.log(`%cDatabase connection has already been terminated`, COLORS.yellow)
    }
}

// Tests
function main() {
    const db1 = DatabaseConnection.getInstance();
    db1.connect(); // Should connect to the database

    const db2 = DatabaseConnection.getInstance();
    db2.connect(); // Should show that there is already an active connection

    console.log('Are they equal:', db1 === db2); // Should show true

    db1.disconnect(); // Should close the connection

    db2.connect(); // Should connect again, as the previous one was closed
}

main();
