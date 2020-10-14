import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

// A DB sémákat a @Schema() decoratorral látjuk el.
// Ha nincs hozzájuk collection a DB-ben, a Mongoose létrehozza.
// A Document-ből kell származniuk.

/**
 * Order séma.
 */
@Schema()
export class FoodNumber extends Document {
  @Prop({
    type: Array<NativeSchema.Types.ObjectId>(),
    required: true,
    ref: 'Product',
  })
  food: Product;

  @Prop({ required: true })
  count: number;
}

// Létre kell hozni explicit módon a sémát, hogy a modulban fel tudjuk konfigurálni.
export const FoodNumberSchema = SchemaFactory.createForClass(FoodNumber);
