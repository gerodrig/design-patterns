/**
 * ! Adapter Pattern
 *  Allows objects with incompatible interfaces to work together, and it is also very
 *  useful for using third-party libraries in our application without directly depending
 *  on them.
 *
 * * It is useful when you want to reuse a class that does not have the interface that
 * * we need or when we want to create an abstraction layer for a third-party library.
 *
 * https://refactoring.guru/design-patterns/adapter
 */

// import { LocalLogger } from "./adapter-files/local-logger.ts";
import { DenoLoggerAdapter } from "./adapter-files/logger-adapter.ts";


const logger = new DenoLoggerAdapter('01-adapter.ts');


logger.writeLog('Regular log message');
logger.writeWarning('Regular Alert, information');
logger.writeError('Something went wrong');