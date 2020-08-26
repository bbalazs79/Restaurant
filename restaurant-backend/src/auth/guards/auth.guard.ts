import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * Authentikációs guard.
 * Megvizsgálja, hogy a User az AuthMiddleware bekerült-e a Request-be.
 * (mivel az AuthMiddleware fűzi be a request-be, miután megkereste a token alapján)
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // A roles-ban benne vannak a szükséges role-ok, ellenőrizni kell, hogy a user rendelkezik-e vele.

    // Itt szintén boolean-nel kell visszatérni
    // Ha false, akkor az ezzel a Guard-al ellátott végpont 403-al tér vissza.
    return !!request.user;
  }
}
