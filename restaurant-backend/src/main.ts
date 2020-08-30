import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

declare const module: any;

// Belépési pontja az app-nak, nagyon alapvető konfiguráció
async function bootstrap() {
  // Express app létrehozása
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // 3000-es port
  

  const options = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setDescription('Restaurant API description')
    .setVersion('1.0')
    .addTag('restaurant')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('port'));

  // Hot Reloading a moduloknak, ha kell
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
