import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';
import { UserToken, UserTokenSchema } from './schemas/user-token.schema';

// Authentikációt reprezentáló modul.
@Module({
  imports: [
    // Az egyes modulokban a Mongoose-nak fel kell konfigurálni a sémákat.
    // Itt a User és a UserToken sémákat kötjük be, mert ezek vannak a modulon belül.
    // Lásd: schemas/user.schema.ts és user-token.schema.ts
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserToken.name, schema: UserTokenSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
