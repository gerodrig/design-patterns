/**
 * ! Observer Pattern
 * The Observer pattern is a behavioral design pattern that establishes
 * a one-to-many relationship between an object, called the subject,
 * and other objects, called observers, which are notified
 * and automatically updated by the subject
 * when changes occur in its state.
 *
 * * It is useful when we need multiple objects to be
 * * aware of changes
 *
 * ! Do not confuse it with RXJS Observables
 *
 * https://refactoring.guru/design-patterns/observer
 */

import { COLORS } from '../helpers/colors.ts';

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];

  constructor(private name: string) {}

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(
      `New channel subscriber to the channel🧍 %c${this.name}`,
      COLORS.green
    );
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(
      `%cA subscriber has stopped 🛑 following ${this.name}`,
      COLORS.red
    );
  }

  uploadVideo(videoTitle: string): void {
    console.log(
      `Channel ${this.name} has uploaded a new video 🎮 %c${videoTitle}`,
      COLORS.green
    );

    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  constructor(private name: string) {}

  notify(videoTitle: string): void {
    console.log(
      `%c${this.name} has been notified of new video ${videoTitle}`,
      COLORS.yellow
    );
  }
}

function main() {
  const channel = new YouTubeChannel('Playing with Benito');

  const sub1 = new Subscriber('Mimi');
  const sub2 = new Subscriber('Emma');
  const sub3 = new Subscriber('Bunny');

  channel.subscribe(sub1);
  channel.subscribe(sub2);
  
  channel.uploadVideo('Night of Fortnite');
  channel.subscribe(sub3);
  
  channel.uploadVideo('Day of Spiderman');

  channel.unsubscribe(sub1);

  channel.uploadVideo('Benito\'s bedtime')
  console.log('\n\n')
}

main();
