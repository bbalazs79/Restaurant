import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';
import { User } from 'src/auth/schemas/user.schema';

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

  @Prop({ type: NativeSchema.Types.ObjectId, required: true, ref: 'Product' })
  food: Product;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: true })
  deliveryTime: Date;
}

// Létre kell hozni explicit módon a sémát, hogy a modulban fel tudjuk konfigurálni.
export const OrderSchema = SchemaFactory.createForClass(Order);
