import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICard } from '../types/card';

@Schema({ _id: false })
export class Card extends Document implements ICard {
    @Prop({ required: true })
    brand: string;

    @Prop({ required: true })
    last4: string;

    @Prop({ required: true })
    exp_month: number;

    @Prop({ required: true })
    exp_year: number;

    @Prop({ required: true })
    funding: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
