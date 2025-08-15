import { ICard } from './card';
import { ILineItem } from './lineItem';

// IPayment interface matching Payment schema
export interface IPayment {
    _id: string;

    // Stripe linkage
    session_id: string;
    payment_intent_id?: string;
    latest_charge_id?: string;
    livemode?: boolean;

    // Amounts
    amount_total?: number;
    currency?: string;
    amount_subtotal?: number;
    amount_tax?: number;
    amount_discount?: number;

    // Status
    status?: string;
    payment_status?: string;
    async_status?: string;
    failure_code?: string;
    failure_message?: string;

    // Customer
    customer_id?: string;
    customer_email?: string;

    // Method details
    payment_method_id?: string;
    card?: ICard; // assumes ICard is already declared elsewhere

    line_items?: ILineItem[]; // assuming LineItem is defined elsewhere

    // Reconciliation
    balance_transaction_id?: string;
    receipt_url?: string;

    // Business data
    metadata?: Record<string, any>;

    // Stripe session creation unix timestamp
    created_at_unix?: number;

    // Mongoose timestamps (added because of { timestamps: true } if you add @Schema)
    createdAt?: Date;
    updatedAt?: Date;
}
