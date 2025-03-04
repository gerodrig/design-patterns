/**
 * ! Decorator Pattern
 * It is a structural design pattern that allows adding
 * functionalities to objects by placing these objects inside
 * special wrapper objects that contain these functionalities.
 *
 * Do not confuse it with TypeScript decorators which are annotations.
 *
 * * It is useful when you need to add functionalities to objects
 *  * dynamically and flexibly.
 *
 * https://refactoring.guru/design-patterns/decorator
 */

import { COLORS } from "../helpers/colors.ts";

interface Notification {
  send(message: string): void;
}

class BasicNotification implements Notification {
  send(message: string): void {
    console.log(`%cSending basic notification: %c${message}`, COLORS.blue, COLORS.white);
  }
}

//? Decorator Class
abstract class NotificationDecorator implements Notification {
  protected notification: Notification;

  constructor(notification: Notification) {
    this.notification = notification;
  }

  send(message: string): void {
    this.notification.send(message);
  }
}

//? Create additional decorators

class EmailDecorator extends NotificationDecorator {
  private sendEmail(message: string) {
    console.log(`%cSending notification via email: %c${message}`, COLORS.orange, COLORS.white);
  }

  override send(message: string): void {
    super.send(message);
    this.sendEmail(message);
  }
}

class SMSDecorator extends NotificationDecorator {
  private sendSMS(message: string) {
    console.log(`%cSending notification via SMS: %c${message}`, COLORS.cyan, COLORS.white);
  }

  override send(message: string): void {
    super.send(message);
    this.sendSMS(message);
  }
}

function main(){
    let notification: Notification = new BasicNotification();

    notification = new EmailDecorator(notification);

    notification = new SMSDecorator(notification);

    notification.send('System Alert!');
}


main();