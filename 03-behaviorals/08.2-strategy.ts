/**
 * ! Strategy Pattern
 *
 * The Strategy pattern is a software design pattern that defines a
 * family of algorithms, encapsulates them, and makes them interchangeable.
 *
 *
 * * It is useful when you have a class with behavior that can
 * * change at runtime and you want to delegate the implementation
 * * responsibility to another class.
 *
 * https://refactoring.guru/design-patterns/strategy
 */

/**
 * !Objective: 
 * Implement the Strategy pattern to calculate taxes for different countries.
 * 
 * !Exercise Description

  Imagine you are working on an e-commerce platform that operates in multiple countries. 
  Each country has its own method for calculating taxes, 
  and you need to implement a system that is:

    1. Flexible: Allows adding new tax calculations 
       without modifying the existing logic.
    2. Dynamic: Changes the tax calculation strategy at runtime 
       based on the selected country.
 */

/**	
    1.	Implement an interface TaxStrategy that defines a method 
        calculateTax(amount: number): number.
        
    2.	Create specific strategy classes for the available countries:
      •	USA: 10% tax.
      •	Canada: 13% tax.
      •	Germany: 19% tax.
      
    3.	Implement a TaxCalculator class that uses the strategies 
        to calculate taxes.
 */

        import { COLORS } from '../helpers/colors.ts';

        // Strategy Interface
        interface TaxStrategy {
          calculateTax(amount: number): number;
        }
        
        // Strategy 1: Taxes in USA
        class USATaxStrategy implements TaxStrategy {
          //? Implement the calculateTax method = amount * 0.1
          calculateTax(amount: number): number {
            return amount * 0.1;
          }
        }
        
        // Strategy 2: Taxes in Canada
        class CanadaTaxStrategy implements TaxStrategy {
          //? Implement the calculateTax method = amount * 0.13
          calculateTax(amount: number): number {
            return amount * 0.13;
          }
        }
        
        // Strategy 3: Taxes in Germany
        class GermanyTaxStrategy implements TaxStrategy {
          //? Implement the calculateTax method = amount * 0.19
          calculateTax(amount: number): number {
            return amount * 0.19;
          }
        }
        
        // Context Class - TaxCalculator
        class TaxCalculator {
          private strategy: TaxStrategy;
        
          //? Implement the constructor receiving the strategy to use
          constructor(strategy: TaxStrategy) {
            this.strategy = strategy;
          }
        
          // Change the tax calculation strategy
          setStrategy(strategy: TaxStrategy): void {
            this.strategy = strategy;
          }
        
          // Calculate taxes
          calculate(amount: number): number {
            return this.strategy.calculateTax(amount);
          }
        }
        
        // Client Code to test
        function main(): void {
          const taxCalculator = new TaxCalculator(new USATaxStrategy());
        
          console.log('%cTax Calculation:\n', COLORS.red);
          console.log('USA: $', taxCalculator.calculate(100).toFixed(2));
        
          console.log('\nSwitching to Canada strategy...');
          taxCalculator.setStrategy(new CanadaTaxStrategy());
          console.log('Canada: $', taxCalculator.calculate(100).toFixed(2));
        
          console.log('\nSwitching to Germany strategy...');
          taxCalculator.setStrategy(new GermanyTaxStrategy());
          console.log('Germany: $', taxCalculator.calculate(100).toFixed(2));
        }
        
        main();