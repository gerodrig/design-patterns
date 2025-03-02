/**
 * ! Adapter Pattern
 *  Allows objects with incompatible interfaces to work together, it is also very
 *  useful for using third-party libraries in our application without directly
 *  depending on them.
 *
 * * It is useful when you want to reuse a class that does not have the interface
 * * we need or when we want to create an abstraction layer for a third-party library.
 *
 * https://refactoring.guru/design-patterns/adapter
 */

import { COLORS } from '../helpers/colors.ts';

// 1. PaymentProcessor Interface
interface PaymentProcessor {
    processPayment(amount: number): void;
}

// 2. External Payment Service Classes
// These classes simulate external services of PayPal, Stripe, and MercadoPago

class PayPalService {
    sendPayment(amount: number): void {
        console.log(`Processing payment of $${amount} with %cPayPal`, COLORS.blue);
    }
}

class StripeService {
    makeCharge(amount: number): void {
        console.log(`Processing payment of $${amount} with %cStripe`, COLORS.purple);
    }
}

class MercadoPagoService {
    pay(amount: number): void {
        console.log(
            `Processing payment of $${amount} with %cMercadoPago`,
            COLORS.yellow
        );
    }
}

// 3. Adapter Classes

// Adapter for PayPal
class PayPalAdapter implements PaymentProcessor {
        private payPalService: PayPalService;

        constructor(service: PayPalService){
                this.payPalService = service;
        }

        processPayment(amount: number): void {
            this.payPalService.sendPayment(amount);
        }
}

// Adapter for Stripe
class StripeAdapter implements PaymentProcessor {
    private stripeService: StripeService;

    constructor(service: StripeService){
        this.stripeService = service;
    }

    processPayment(amount: number): void {
        this.stripeService.makeCharge(amount);
    }
}

// Adapter for MercadoPago
class MercadoPagoAdapter implements PaymentProcessor {
    private mercadoPagoService: MercadoPagoService;

    constructor(service: MercadoPagoService) {
        this.mercadoPagoService = service;
    }

    processPayment(amount: number): void {
        this.mercadoPagoService.pay(amount);
    }
}

// 4. Client Code to test the Adapter

function main() {
    const paymentAmount = 100;

    const paypalProcessor: PaymentProcessor = new PayPalAdapter(new PayPalService());
    const stripeProcessor: PaymentProcessor = new StripeAdapter(new StripeService());
    const mercadoPagoProcessor: PaymentProcessor = new MercadoPagoAdapter(new MercadoPagoService());

    // Process payments with different services
    // All 3 payment processors work exactly the same after being adapted
    console.log('Using PayPal:');
    paypalProcessor.processPayment(paymentAmount);

    console.log('\nUsing Stripe:');
    stripeProcessor.processPayment(paymentAmount);

    console.log('\nUsing MercadoPago:');
    mercadoPagoProcessor.processPayment(paymentAmount);
}

main();
