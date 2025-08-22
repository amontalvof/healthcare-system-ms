import Stripe from 'stripe';

export interface IRefundPayment {
    paymentIntentId: string;
    appointmentId: string;
    amount?: number; // optional, cents
    reason?: Stripe.RefundCreateParams.Reason; // 'requested_by_customer' | 'duplicate' | 'fraudulent'
    idempotencyKey?: string;
}
