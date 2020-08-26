import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { Role } from './role.schema';

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

  @Prop({type: NativeSchema.Types.ObjectId, required: true , ref: 'Role'})
  role: Role;
}

// Létre kell hozni explicit módon a sémát, hogy a modulban fel tudjuk konfigurálni.
export const UserSchema = SchemaFactory.createForClass(User);
