/**
 * ! Factory Method:
 * The Factory Method pattern allows creating objects without specifying
 * the exact class of the object that will be created.
 *
 * Instead, we delegate the creation of objects to subclasses or methods
 * that encapsulate this logic.
 *
 * * It is useful when a class cannot anticipate the class
 * * of objects it must create.
 *
 * https://refactoring.guru/design-patterns/factory-method
 */

/**
 * 	!Description:
  1.	Complete the SalesReport and InventoryReport classes to implement 
      the Report interface, generating the content of each report in the generate method.
    
  2.	Implement the SalesReportFactory and InventoryReportFactory classes 
      to create instances of SalesReport and InventoryReport, respectively.

  3.	Test the program by generating different types of reports using
      the prompt to select the type of report.
 */

      import { COLORS } from '../helpers/colors.ts';

      // 1. Define the Report interface
      interface Report {
        generate(): void;
      }
      
      // 2. Concrete Report classes
      // Implement SalesReport and InventoryReport
      
      class SalesReport implements Report {
        generate():void {
            console.log('Printing the %cSales Report', COLORS.blue);
        }
      }
      
      class InventoryReport implements Report {
        // 'Generating inventory report...'
        generate():void {
            console.log('Printing the %cInventory Report', COLORS.orange);
        }
      }
      
      // 3. Base ReportFactory class with the Factory Method
      
      abstract class ReportFactory {
        protected abstract createReport(): Report;
      
        generateReport(): void {
          const report = this.createReport();
          report.generate();
        }
      }
      
      // 4. Concrete Report Factory classes
      
      class SalesReportFactory extends ReportFactory {
        createReport(): Report {
          return new SalesReport();
        }
      }
      
      class InventoryReportFactory extends ReportFactory {
        createReport(): Report {
            return new InventoryReport();
        }
      }
      
      // 5. Client Code to Test
      
      function main() {
        let reportFactory: ReportFactory;
      
        const reportType = prompt(
          'What type of report do you want? (sales/inventory)');
      
        if (reportType === 'sales') {
          reportFactory = new SalesReportFactory();
        } else {
          reportFactory = new InventoryReportFactory();
        }
      
        reportFactory.generateReport();
      }
      
      main();
      