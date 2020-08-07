import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// A Controllerek REST resource-okat azonosítanak
// A Controllerek egyes metódusai, amelyek el vannak látva a
// megfelelő decoratorokkal (pl @Get, @Post, @Put) végpontok lesznek.
// Az útvonalak paraméterezhetők:
// @Controller('app') -> pl. http://localhost:3000/app
// Majd a belső végpontok is ez alá kerülnek.
// Jelenleg ez a root-ra mutat.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
