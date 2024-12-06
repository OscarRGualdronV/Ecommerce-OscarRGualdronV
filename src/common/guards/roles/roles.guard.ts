import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../../users/enum/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if ( !requiredRoles ) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(!user || !user.administrador){
      throw new UnauthorizedException('Do you have permission to access this route');
    }

    const hasRole = () => requiredRoles.some((role) => 
      user.administrador?.includes(role));
    const valid = user?.administrador && hasRole();

    if(!valid){
      throw new UnauthorizedException('Do you have permission to access this route');
    }
    return valid;
  }
}
