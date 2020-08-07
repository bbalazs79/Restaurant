import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// A DB sémákat a @Schema() decoratorral látjuk el.
// Ha nincs hozzájuk collection a DB-ben, a Mongoose létrehozza.
// A Document-ből kell származniuk.

/**
 * Felhasználó séma.
 */
@Schema()
export class User extends Document {

  // Az egyes propertyket @Prop() decoratorral kell ellátni.
  // Többféle paraméter van (típus, required, ref, stb.)
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

// Létre kell hozni explicit módon a sémát, hogy a modulban fel tudjuk konfigurálni.
export const UserSchema = SchemaFactory.createForClass(User);
