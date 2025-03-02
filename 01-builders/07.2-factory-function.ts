/**
 * ! Factory Function
 * It is a design pattern that allows us to create objects or functions dynamically that will be
 * used later in the code.
 *
 * * It is useful when we need to create objects or functions dynamically,
 * * that is, at runtime and not at compile time.
 *
 */

//! Expected output
//! Set log colors according to the level
//* [INFO:2025-10-21:07] Application started successfully.
//* [WARNING:2025-10-21:07] Memory usage is high.
//* [ERROR:2025-10-21:07] Error de conexión a la base de datos.

import { COLORS } from '../helpers/colors.ts';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Función fábrica que crea un manejador de logs
type LogLevel = 'info' | 'warn' | 'error';

function createLogger(level: LogLevel) {
  // Retorna una función que recibe el "message" como argumento
  // Completar: implementar el logger con formato y color para cada nivel
  return function (msg: string) {
    const log = {
      info: {
        prefix: 'INFO',
        color: COLORS.blue
      },
      warn: {
        prefix: 'WARN',
        color: COLORS.yellow
      },
      error: {
        prefix: 'ERROR',
        color: COLORS.red
      },
    };

    return console.log(`[%c${log[level].prefix}:${formatDate(new Date())}%c] ${msg}`, log[level].color, COLORS.white);
  };
}

// Ejemplo de uso
function main() {
  const infoLogger = createLogger('info');
  const warnLogger = createLogger('warn');
  const errorLogger = createLogger('error');

  infoLogger('Aplicación iniciada correctamente.');
  warnLogger('El uso de memoria está alto.');
  errorLogger('Error de conexión a la base de datos.');
}

main();
