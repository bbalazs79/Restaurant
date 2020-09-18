import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Document, Schema as NativeSchema } from 'mongoose';
import { Allergens } from '../enums/allergene.enum';

// A DB sémákat a @Schema() decoratorral látjuk el.
// Ha nincs hozzájuk collection a DB-ben, a Mongoose létrehozza.
// A Document-ből kell származniuk.

/**
 * Role séma.
 */
@Schema()
export class Ingredient extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({})
  allergen: Allergens[];
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
