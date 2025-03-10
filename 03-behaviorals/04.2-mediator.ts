/**
 * ! Mediator Pattern
 * It is a behavioral design pattern that helps reduce
 * chaotic dependencies between objects.
 * This pattern limits direct communication between them,
 * making them interact only through a mediator object.
 *
 * * It is useful to reduce the complexity of relationships between objects
 *
 * https://refactoring.guru/design-patterns/mediator
 */

/**
 * 1.	Class ControlTower:
    •	Acts as the Mediator between airplanes.
    The control tower coordinates communications between airplanes
    to avoid collisions and receive their takeoff
    or landing requests.

    2.	Class Airplane:
    •	Represents an airplane that can send and receive messages
    through the control tower.
    Airplanes do not communicate directly with each other,
    but through the control tower, which manages the information.

    3.	Interactions:
    •	Airplanes can request permission to land or take off,
    and the control tower will send messages to other airplanes
    notifying them of each airplane's activity.
 */

import { COLORS } from '../helpers/colors.ts';

// Mediator Class - ControlTower
class ControlTower {
  private airplanes: Airplane[] = [];

  // Register an airplane in the control tower
  //* Implement the registerAirplane method
  registerAirplane(airplane: Airplane) {
    this.airplanes.push(airplane);
  }

  // Send a message from one airplane to all others
  //* Implement the sendMessage method
  sendMessage(sender: Airplane, message: string): void {
    const airplanesToSend = this.airplanes.filter(airplane => airplane !== sender);

    for (const airplane of airplanesToSend) {
      airplane.receiveMessage(sender, message);
    }
  }

  // Landing coordination
  requestLanding(sender: Airplane): void {
    console.log(
      `\n%cControl Tower: %cLanding permission granted to ${sender.getId()}`,
      COLORS.green,
      COLORS.white
    );

    this.sendMessage(sender, `${sender.getId()} is landing.`);
  }

  // Takeoff coordination
  requestTakeoff(sender: Airplane): void {
    console.log(
      `\n%cControl Tower: %cTakeoff permission granted to ${sender.getId()}`,
      COLORS.green,
      COLORS.white
    );

    this.sendMessage(sender, `${sender.getId()} is taking off.`);
  }
}

// Colleague Class - Airplane
class Airplane {
  private id: string;
  private controlTower: ControlTower;

  constructor(id: string, controlTower: ControlTower) {
    this.id = id;
    this.controlTower = controlTower;

    //* Register the airplane in the control tower
    this.controlTower.registerAirplane(this);
  }

  getId(): string {
    return this.id;
  }

  // Request landing from the control tower
  requestLanding(): void {
    console.log(`${this.id} requests permission to land.`);

    //* Request landing from the control tower
    this.controlTower.requestLanding(this);
  }

  // Request takeoff from the control tower
  requestTakeoff(): void {
    console.log(`${this.id} requests permission to take off.`);

    //* Request takeoff from the control tower
    this.controlTower.requestTakeoff(this);
  }

  // Receive message from other airplanes
  receiveMessage(sender: Airplane, message: string): void {
    console.log(
      `${this.id} receives message from %c${sender.getId()}: "${message}"`,
      COLORS.blue
    );
  }
}

// Client Code to test the Mediator pattern
// ! Nothing to modify in this block
function main(): void {
  const controlTower = new ControlTower();

  const airplane1 = new Airplane('Flight 101', controlTower);
  const airplane2 = new Airplane('Flight 202', controlTower);
  const airplane3 = new Airplane('Flight 303', controlTower);

  // Example interactions
  airplane1.requestLanding();
  airplane2.requestTakeoff();
  airplane3.requestLanding();
}

main();