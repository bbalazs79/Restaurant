import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from '../services/role.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private roleService: RoleService) {}

  public async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | false> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const userRole = await this.roleService.findById(request.user.role);
    let returnValue = false;
    
    roles.forEach(result=>{
        if(userRole === result){
            returnValue = true;
        }
    });
    return returnValue;
  }
}
