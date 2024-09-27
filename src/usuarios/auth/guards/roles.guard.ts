import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
 
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        // por defecto es true
        if (!requiredRoles) {
            return true;
        }

        // Obtenemos el objeto 'user' de la solicitud HTTP actual.
 
        const { user } = context.switchToHttp().getRequest();

        // Verificamos si los roles del usuario incluyen al menos uno de los roles requeridos. Si es así, le damos acceso
       
        return requiredRoles.includes(user.role);
    }
}
