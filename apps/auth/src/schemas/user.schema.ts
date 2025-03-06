import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../types/user';

@Schema()
export class User extends Document implements IUser {
    @Prop({
        default: () => uuidv4(),
    })
    _id: string;

    @Prop({ required: true, unique: true, index: true })
    email: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ default: ['patient'] })
    roles: string[];

    @Prop({ default: () => Date.now() })
    createdAt: Date;

    @Prop({ default: () => Date.now() })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
