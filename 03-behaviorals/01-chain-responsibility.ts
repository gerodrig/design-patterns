/**
 * ! Chain of Responsibility Pattern
 * It is a behavioral design pattern that allows you to pass requests
 * along a chain of handlers.
 *
 * * It is useful when data needs to be processed in different ways, but it is not
 * * known in advance what type of processing is needed or in what order,
 * * but it is known that it needs to be processed in a sequence.
 *
 * https://refactoring.guru/design-patterns/chain-of-responsibility
 */

import { COLORS } from "../helpers/colors.ts";

interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): void;
}

abstract class BaseHandler implements Handler{

    private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  handle(request: string): void {
    if(this.nextHandler){
        this.nextHandler.handle(request);
    }
  }
}

//? Basic Support
class BasicSupport extends BaseHandler {

    override handle(request: string): void{
        if(request === 'basic'){
            console.log('%cBasic support fixing basic problem', COLORS.green)
            return;
        }

        console.log('Basic support: Escalating issue to T2 Support');
        super.handle(request);
    }
}

//? T2 support
class T2Support extends BaseHandler {

    override handle(request: string): void{
        if(request === 't2'){
            console.log('%cT2 support fixing basic problem', COLORS.yellow)
            return;
        }

        console.log('T2 support: Escalating issue to T1 Support');
        super.handle(request);
    }
}

//? T1 support
class T1Support extends BaseHandler {

    override handle(request: string): void{
        if(request === 't1'){
            console.log('%cT1 support fixing basic problem', COLORS.purple)
            return;
        }

        console.log('%cThere is nothing to do, sorry!', COLORS.red);
        super.handle(request);
    }
}

function main(){
    const basicSupport = new BasicSupport();
    const t2Support = new T2Support();
    const t1Support = new T1Support();

    basicSupport.setNext(t2Support).setNext(t1Support);

    basicSupport.handle('basic');
    basicSupport.handle('t2');
    basicSupport.handle('t1');
    basicSupport.handle('t0');
}


main();