import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';
import { User } from './user.schema';

/**
 * Felhasználó token objektum.
 */
@Schema()
export class UserToken extends Document {
  @Prop({ required: true })
  value: string;

  // Kapcsolat reprezentálásához például azt lehet csinálni,
  // hogy ellátjuk a property-t a másik objektum típusával,
  // és a @Prop() decoratorban megmondjuk, hogy valójában ObjectId-t szeretnénk tárolni.
  // A ref string típusú, és szükséges (általában ez is a kapcsolt objektum típusa, csak szövegként)
  @Prop({ type: NativeSchema.Types.ObjectId, required: true, ref: 'User' })
  user: User;

  @Prop()
  expirationDate: Date;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
