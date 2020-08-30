import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/**
 * Authentikációs guard.
 * Megvizsgálja, hogy a User az AuthMiddleware bekerült-e a Request-be.
 * (mivel az AuthMiddleware fűzi be a request-be, miután megkereste a token alapján)
 */
@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Itt szintén boolean-nel kell visszatérni
    // Ha false, akkor az ezzel a Guard-al ellátott végpont 403-al tér vissza.
    return !!request.user;
  }
}
