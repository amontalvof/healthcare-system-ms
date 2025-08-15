import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CardSchema } from './card.schema';
import { SchemaTypes } from 'mongoose';
import { IPayment } from '../types/payment';
import { LineItemSchema } from './lineItem.schema';
import { ILineItem } from '../types/lineItem';
import { ICard } from '../types/card';

@Schema({ timestamps: true })
export class Payment extends Document implements IPayment {
    @Prop({
        default: () => uuidv4(),
    })
    _id: string;
    // Stripe linkage
    @Prop({ index: true, unique: true })
    session_id: string;

    @Prop({ index: true })
    payment_intent_id: string;

    @Prop({ index: true })
    latest_charge_id: string;

    @Prop()
    livemode: boolean;

    // Amounts
    @Prop()
    amount_total: number; // cents

    @Prop()
    currency: string;

    @Prop()
    amount_subtotal?: number;

    @Prop()
    amount_tax?: number;

    @Prop()
    amount_discount?: number;

    // Status
    @Prop()
    status: string; // session.status

    @Prop()
    payment_status: string; // 'paid' | 'unpaid' | 'no_payment_required'

    @Prop()
    async_status?: string; // custom: 'succeeded' | 'failed'

    @Prop()
    failure_code?: string;

    @Prop()
    failure_message?: string;

    // Customer
    @Prop()
    customer_id?: string;

    @Prop()
    customer_email?: string;

    // Method details
    @Prop()
    payment_method_id?: string;

    @Prop({ type: CardSchema })
    card?: ICard;

    @Prop({ type: [LineItemSchema], default: [] })
    line_items?: ILineItem[];

    // Reconciliation
    @Prop()
    balance_transaction_id?: string;

    @Prop()
    receipt_url?: string;

    @Prop({ type: SchemaTypes.Mixed })
    metadata?: Record<string, string>;

    // Stripe session creation unix timestamp
    @Prop()
    created_at_unix: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
