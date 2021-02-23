import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';
import { UserToken, UserTokenSchema } from './schemas/user-token.schema';
import { Role, RoleSchema } from './schemas/role.schema';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';

// Authentikációt reprezentáló modul.
@Module({
  imports: [
    // Az egyes modulokban a Mongoose-nak fel kell konfigurálni a sémákat.
    // Itt a User és a UserToken sémákat kötjük be, mert ezek vannak a modulon belül.
    // Lásd: schemas/user.schema.ts és user-token.schema.ts
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserToken.name, schema: UserTokenSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [AuthController, RoleController, AdminController],
  providers: [AuthService, RoleService, AdminService,],
  exports: [AuthService, RoleService],
})
export class AuthModule {}
