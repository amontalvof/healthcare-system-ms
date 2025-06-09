import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
    private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    async createPaymentSession() {
        return this.stripe.checkout.sessions.create({
            payment_intent_data: {
                metadata: {},
            },
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Example Product',
                        },
                        unit_amount: 2000, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
        });
    }
}
