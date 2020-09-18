import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { Ingredient } from './ingredient.schema';

// A DB sémákat a @Schema() decoratorral látjuk el.
// Ha nincs hozzájuk collection a DB-ben, a Mongoose létrehozza.
// A Document-ből kell származniuk.

/**
 * Role séma.
 */
@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: NativeSchema.Types.ObjectId })
  ingredients: Ingredient[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
