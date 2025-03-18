/**
 * !Visitor Pattern
 *
 * The Visitor pattern is a behavioral design pattern
 * that allows you to separate algorithms from the objects
 * on which they operate.
 *
 * * It is useful when you need to add new operations to
 * * stable classes without changing their code.
 *
 * https://refactoring.guru/design-patterns/visitor
 */

/**
 * Context: Imagine you are designing a system for a theme
 * park with different types of attractions:
 * roller coasters, haunted houses, and ferris wheels.
 *
 * Each attraction has its own entry price and offers a discount
 * depending on the type of visitor (child, adult, or senior).
 *
 * This is where the Visitor pattern comes in, which allows applying
 * specific operations (such as calculating the discounted price) depending
 * on both the attraction and the type of visitor,
 * without modifying the original classes.
 */