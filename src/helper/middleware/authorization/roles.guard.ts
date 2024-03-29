import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { roleType as Role } from 'src/helper/types/req.type';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    //@ts-ignore
    const { user }: Request = context.switchToHttp().getRequest(); //get user from jwt payload
    const a = requiredRoles.some((role) => {
      return user.role?.includes(role);
    });
    // console.log(a);
    return a;
  }
}
