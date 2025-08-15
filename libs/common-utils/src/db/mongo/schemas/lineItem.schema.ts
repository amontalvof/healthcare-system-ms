import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export interface ILineItem {
    description: string;
    unit_amount: number;
    quantity: number;
    currency: string;
}

@Schema({ _id: false })
export class LineItem extends Document implements ILineItem {
    @Prop({ required: true }) description: string;
    @Prop({ required: true }) unit_amount: number;
    @Prop({ required: true }) currency: string;
    @Prop({ required: true }) quantity: number;
}

export type LineItemDocument = HydratedDocument<LineItem>;
export const LineItemSchema = SchemaFactory.createForClass(LineItem);
