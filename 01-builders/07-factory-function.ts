/**
 * ! Factory Function
 * It is a design pattern that allows us to create objects or functions dynamically that will be
 * used later in the code.
 *
 * * It is useful when we need to create objects or functions dynamically,
 * * that is, at runtime and not at compile time.
 *
 */

import { COLORS } from '../helpers/colors.ts';

type Language = 'es' | 'en' | 'fr';

//? i18n
function createGreet( lang: Language ){
    return function (name: string){
        const message = {
            es: `Hola, %c${name}!`,
            en: `Hello, %c${name}!`,
            fr: `Bonjour, %c${name}!`
        }

        return console.log(message[lang], COLORS.pink);
    }
}

function main(){

    const spanishGreet = createGreet('es');
    const englishGreet = createGreet('en');
    const frenchGreet = createGreet('fr');

    spanishGreet('Benito');
    englishGreet('Mimi');
    frenchGreet('Emma');
}

main();