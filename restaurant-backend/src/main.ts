import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

// Belépési pontja az app-nak, nagyon alapvető konfiguráció
async function bootstrap() {
  // Express app létrehozása
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // 3000-es port
  await app.listen(3000);

  // Hot Reloading a moduloknak, ha kell
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
