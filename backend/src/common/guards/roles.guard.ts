import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = this.resolveUserFromToken(request);

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (!user?.roles) {
      throw new UnauthorizedException('User role context missing');
    }

    const allowed = requiredRoles.some((role) => user.roles.includes(role));
    if (!allowed) {
      throw new ForbiddenException('Insufficient role for this action');
    }

    return true;
  }

  private resolveUserFromToken(request: any): { id?: string; roles: string[] } | null {
    if (request.user?.roles) {
      return request.user;
    }

    const authHeader = request.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.slice('Bearer '.length).trim();
    if (!token) {
      return null;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'change_me_access') as {
        sub?: string;
        roles?: string[];
      };

      request.user = {
        id: decoded.sub,
        roles: Array.isArray(decoded.roles) ? decoded.roles : [],
      };

      return request.user;
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
