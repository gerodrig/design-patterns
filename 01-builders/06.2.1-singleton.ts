/**
 * ! Singleton:
 * It is a creational design pattern that ensures a class
 * has a single instance and provides a global access point to it.
 *
 * * It is useful when you need to control access to a single instance
 * * of a class, such as in a database object or a
 * * configuration object.
 *
 * https://refactoring.guru/design-patterns/singleton
 */

import { configManager} from './singleton/config-manager.ts';

configManager.setConfig('apiURL', 'http://localhost:3000/api');
configManager.setConfig('timeout', '5000');
configManager.setConfig('apiKey', 'ABC123');

console.log(configManager.getConfig('apiURL'));
console.log(configManager.getConfig('timeout'));
console.log(configManager.getConfig('apiKey'));