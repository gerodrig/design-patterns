/**
 * ! Mediator Pattern
 * It is a behavioral design pattern that helps reduce
 * the chaotic dependencies between objects.
 * This pattern limits direct communication between them,
 * making them interact only through a mediator object.
 *
 * * It is useful to reduce the complexity of relationships between objects
 *
 * https://refactoring.guru/design-patterns/mediator
 */

import { COLORS } from '../helpers/colors.ts';

//* Chatroom
class ChatRoom {
  private users: User[] = [];

  constructor(public title: string) {}

  addUser(user: User): void {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string): void {
    const usersToSend = this.users.filter((user) => user !== sender);

    for (const user of usersToSend) {
      user.receiveMessage(sender, message);
    }
  }
}

class User {
  constructor(private username: string, private chatroom: ChatRoom) {
    chatroom.addUser(this);
  }

  sendMessage(message: string): void {
    console.log(
      `\n%c${this.username} sends: %c${message}`,
      COLORS.blue,
      COLORS.white
    );
    this.chatroom.sendMessage(this, message);
  }

  receiveMessage(sender: User, message: string): void {
    console.log(
      `%c${this.username} receives from  ${sender.username}: %c${message}`,
      COLORS.blue,
      COLORS.white
    );
  }
}


function main(){
    const chatRoom = new ChatRoom('Workgroup');

    const user1 = new User('Benito', chatRoom);
    const user2 = new User('Mimi', chatRoom);
    const user3 = new User('Emma', chatRoom);

    user1.sendMessage('Hello Everyone!');
    user2.sendMessage('Hello Benito how are you?');
    user3.sendMessage('Hello everyone I hope you are having a great day!');

    console.log('\n');
}


main();