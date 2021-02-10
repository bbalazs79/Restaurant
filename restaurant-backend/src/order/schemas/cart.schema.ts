import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { OrderState } from '../enums/orderstate.enum';

export type CartDocument = Cart & Document;


@Schema()
export class Cart{
    @Prop({
    type: NativeSchema.Types.ObjectId,
    ref: 'Product',
    required: true,
    })
    food: string;

    @Prop({ required: true })
    count: number;

    @Prop({ type: NativeSchema.Types.ObjectId, ref: "User" ,required: true })
    user: string;

    @Prop({required: true})
    state: OrderState;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
