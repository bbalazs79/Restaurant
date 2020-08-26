import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { extractAuthorizationHeader } from '../utils/extract-authorization';

// A middleware-ek a HTTP hívási láncba "behúzott" logikát jelentik
// pl. request bejövetelekor, vagy response kiküldése előtt

/**
 * Authentikációs middleware.
 * Minden végpont metódus meghívása előtt lefut.
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private authService: AuthService) { }

  use(req: any, res: any, next: () => void) {
    // Kiszedjük az Authorization header-t a request-ből (formája: "Bearer <Token>").
    const authorization = extractAuthorizationHeader(req);
    switch (authorization.scheme) {
      // Alapvetően a Bearer a leggyakoribb módszer, de nem baj, ha felkészül az ember több lehetőségre is.
      case 'Bearer':
        // Promise használatára példa await nélkül
        // A then-be bekerült kód akkor fut le, ha végzett a Promise.
        // Lehet catch és finally ága is.
        // next() -> a Middleware-hez köthető, meg kell mindenképp hívni, hogy a további Middleware-ek lefussanak.
        this.authService.findUserByToken(authorization.token)
          .then((user) => {
            req.user = user;
          })
          .finally(() => next());
      break;
      default:
        next();
    }
  }
}
