import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { Cart } from './cart.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order{
  @Prop({
    type: NativeSchema.Types.ObjectId,
    required: true,
    ref: 'Cart',
  })
  Order: Cart[];

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: true })
  deliveryTime: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
