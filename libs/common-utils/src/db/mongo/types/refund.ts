export interface IRefund {
    refund_id: string;
    payment_intent_id: string;
    charge_id: string;
    amount: number;
    currency: string;
    status: string;
    reason?:
        | 'requested_by_customer'
        | 'duplicate'
        | 'fraudulent'
        | 'expired_uncaptured_charge';
    balance_transaction_id?: string;
    created_at_unix: number; // Unix timestamp
    createdAt: Date;
    updatedAt: Date;
    metadata?: Record<string, any>; // optional, for additional data
}
