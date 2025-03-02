/**
 * ! Bridge Pattern
 * This pattern allows us to decouple an abstraction from its implementation,
 * so that both can vary independently.
 *
 * * It is useful when there are multiple implementations of an abstraction
 * * It can be used to separate business logic from presentation logic
 * * It can also be used to separate user interface logic.
 *
 * https://refactoring.guru/design-patterns/bridge
 */

import { COLORS } from '../helpers/colors.ts';

// 1. NotificationChannel Interface
// Defines the `send` method, which each communication channel will implement.
interface NotificationChannel {
    send(message: string): void;
}

// 2. Communication Channel Implementations

class EmailChannel implements NotificationChannel {
    send(message: string): void {
        console.log(`Sending email: ${message}`);
    }
}

class SMSChannel implements NotificationChannel {
    send(message: string): void {
        console.log(`Sending SMS: ${message}`);
    }
}

class PushNotificationChannel implements NotificationChannel {
    send(message: string): void {
        console.log(`Sending Push: ${message}`);
    }
}

// 3. Abstract Notification Class
// Defines the `channel` property and the `notify` method

abstract class Notification {
    protected channels: NotificationChannel[];

    constructor(channels: NotificationChannel[]) {
        this.channels = channels;
    }

    abstract notify(message: string): void;
    abstract addChannel(channel: NotificationChannel): void;
}

class AlertNotification extends Notification {
    override notify(message: string): void {
        console.log('\n%cAlert Notification', COLORS.red);
        this.channels.forEach((channel) => channel.send(message));
    }

    override addChannel(channel: NotificationChannel): void {
        this.channels.push(channel);
    }
}

function main() {
    const channels = [
        new EmailChannel(),
        new SMSChannel(),
        new PushNotificationChannel(),
        new PushNotificationChannel(),
        new PushNotificationChannel(),
        new SMSChannel(),
        new EmailChannel(),
    ];

    const alert = new AlertNotification(channels);

    alert.notify('Someone in front of the house');

    console.log('\n');
}

main();