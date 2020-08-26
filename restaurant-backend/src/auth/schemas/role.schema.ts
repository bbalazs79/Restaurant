import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as NativeSchema } from 'mongoose';

// A DB sémákat a @Schema() decoratorral látjuk el.
// Ha nincs hozzájuk collection a DB-ben, a Mongoose létrehozza.
// A Document-ből kell származniuk.

/**
 * Role séma.
 */
@Schema()
export class Role extends Document {
  @Prop({ required: true })
  role: string;
}

// Létre kell hozni explicit módon a sémát, hogy a modulban fel tudjuk konfigurálni.
export const RoleSchema = SchemaFactory.createForClass(Role);
