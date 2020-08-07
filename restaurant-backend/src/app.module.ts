import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';

// Fő app modul, globális dolgokat tartalmaz
@Module({
  imports: [
    AuthModule,
    // Konfigurációhoz, lehetővé teszi, hogy környezeti változókból olvassunk be bizonyos paramétereket
    // Jelenleg ezek a .env fájlban vannak (de éles környezetben ez nem így megy)
    // pl. process.env.DATABASE_URL
    ConfigModule.forRoot(),
    // Mongoose globális beállítása, paraméterben a connection URL van, a szükséges adatok környezeti változókból jönnek
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`,
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // Globális Middleware konfiguráció
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
