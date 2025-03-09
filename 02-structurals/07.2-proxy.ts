/**
 * ! Proxy Pattern
 * This pattern is used to control access to an object, that is,
 * an object is created that acts as an intermediary between the client and the real object.
 *
 * * It is useful when we need to control access to an object,
 * * for example, to check if the client has permission
 * * to access certain methods or properties.
 *
 * https://refactoring.guru/design-patterns/proxy
 *
 */

import { COLORS } from '../helpers/colors.ts';

// 1. Document Interface
interface Document {
    displayContent(user: User): void;
}

// 2. Class representing the Confidential Document - ConfidentialDocument
class ConfidentialDocument implements Document {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    displayContent(): void {
        console.log(`Document content: \n%c${this.content}\n`, COLORS.blue);
    }
}

// 3. Proxy Class - DocumentProxy
class DocumentProxy implements Document {
    //? Implement the constructor of the DocumentProxy class
    constructor(
        private document: Document,
        private mustHaveRoles: string[] =[]
    ) {}

    displayContent(user: User): void {
        //? Implement the logic to check if the user has permissions
        // Only if the user is admin can they see the content
        // Otherwise, show an access denied message:
        // EX: `%cAccess denied. ${user.getName()}, you do not have sufficient permissions to view this document.`,
        if (this.mustHaveRoles.includes(user.getRole())) {
            this.document.displayContent(user);
            return;
        }
        // if (user.getRole() === 'admin') {
        //     this.document.displayContent(user);
        //     return;
        // }

        console.log(
            `%cAccess denied. ${user.getName()}, you do not have sufficient permissions to view this document.`,
            COLORS.red
        );
    }
}

// 4. Class representing the User - User
class User {
    private name: string;
    private role: 'admin' | 'user';

    constructor(name: string, role: 'admin' | 'user') {
        this.name = name;
        this.role = role;
    }

    getName(): string {
        return this.name;
    }

    getRole(): string {
        return this.role;
    }
}

// 5. Client Code to test the Proxy

function main() {
    const confidentialDoc = new ConfidentialDocument(
        'This is the confidential content of the document.'
    );
    // const roles = ['admin', 'user'];
    const proxy = new DocumentProxy(confidentialDoc, ['admin']);

    const user1 = new User('John', 'user');
    const user2 = new User('Anna', 'admin');

    console.log('Access attempt by user 1:');
    proxy.displayContent(user1); // Should deny access

    console.log('\nAccess attempt by user 2:');
    proxy.displayContent(user2); // Should allow access
}

main();
