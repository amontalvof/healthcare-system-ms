import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IRefund } from '../types/refund';
import { SchemaTypes } from 'mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Refund extends Document implements IRefund {
    @Prop({ default: () => uuidv4() })
    _id: string;

    // Stripe identifiers
    @Prop({ index: true, unique: true })
    refund_id: string; // re_*

    @Prop({ index: true })
    payment_intent_id: string; // pi_*

    @Prop({ index: true })
    charge_id: string; // ch_*

    // Amounts
    @Prop()
    amount: number; // cents

    @Prop()
    currency: string;

    // Status & reason
    @Prop({ index: true })
    status: 'pending' | 'succeeded' | 'failed' | 'canceled';

    @Prop()
    reason?:
        | 'requested_by_customer'
        | 'duplicate'
        | 'fraudulent'
        | 'expired_uncaptured_charge';

    @Prop({ type: SchemaTypes.Mixed })
    metadata?: Record<string, any>;

    @Prop()
    balance_transaction_id?: string;

    // Stripe creation timestamp
    @Prop()
    created_at_unix: number;

    // Timestamps added by Mongoose when timestamps: true
    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const RefundSchema = SchemaFactory.createForClass(Refund);
