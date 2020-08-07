import { Injectable } from '@nestjs/common';

// Injektálható Service.
// Általában DB hívásokra, és hasonló logikákra használjuk.
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World';
  }
}
