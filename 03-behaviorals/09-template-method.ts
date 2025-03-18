/**
 * ! Template Method Pattern
 *
 * The Template Method pattern is a behavioral design pattern
 * that defines the skeleton of an algorithm in an operation,
 * delegating some steps to subclasses.
 *
 * It allows subclasses to redefine certain steps of an algorithm
 * without changing its structure.
 *
 * * It is useful when you have an algorithm that follows a sequence of steps
 * * and you want to allow subclasses to redefine some of those steps.
 *
 * https://refactoring.guru/design-patterns/template-method
 */

/**
 * Context: We are going to implement a system that allows the preparation
 * of different hot beverages, such as coffee and tea.
 *
 * Although the general process for preparing both beverages is similar
 * (boil water, add the main ingredient, serve in a cup),
 * there are specific steps that vary depending on the beverage.
 *
 * The Template Method pattern is perfect for this case,
 * as it defines a general skeleton of the algorithm in a base class
 * and delegates the specific details to subclasses.
 */