import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Product } from 'src/product/schemas/product.schema';
import { OrderState } from '../enums/orderstate.enum';

export type CartDocument = Cart & Document;


@Schema()
export class Cart{
    @Prop({
    type: NativeSchema.Types.ObjectId,
    ref: Product.name,
    required: true,
    })
    /* food: NativeSchema.Types.ObjectId; */
    food: string;

    @Prop({ required: true })
    count: number;

    @Prop({ type: NativeSchema.Types.ObjectId, ref: User.name ,required: true })
    /* user: NativeSchema.Types.ObjectId; */
    user: string;

    @Prop({required: true})
    state: OrderState;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
