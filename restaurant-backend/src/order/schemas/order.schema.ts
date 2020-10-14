import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { FoodNumber } from './food-order-count.schema';

// A DB sémákat a @Schema() decoratorral látjuk el.
// Ha nincs hozzájuk collection a DB-ben, a Mongoose létrehozza.
// A Document-ből kell származniuk.

/**
 * Order séma.
 */
@Schema()
export class Order extends Document {
  @Prop({ type: NativeSchema.Types.ObjectId, required: true, ref: 'User' })
  user: User;

  @Prop({
    type: NativeSchema.Types.ObjectId,
    required: true,
    ref: 'FoodNumber',
  })
  food: FoodNumber;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: true })
  deliveryTime: Date;
}

// Létre kell hozni explicit módon a sémát, hogy a modulban fel tudjuk konfigurálni.
export const OrderSchema = SchemaFactory.createForClass(Order);
