import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRoles } from 'src/common/enum/user-roles.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    let token = req.headers.authorization;

    if (!token) throw new UnauthorizedException();

    token = token.split(' ')[1];
try {
  let payload = await this.jwtService.verify(token);
  if (!payload) throw new UnauthorizedException();

  req.userId = payload.userId;

  let user = await this.userService.findOne({id: payload.user.id})

  if(!user) throw new Error();

  let roles = this.reflector.get('roles', context.getHandler())
  if(roles && !user.roles.includes(UserRoles.ADMIN)){
  let checkRoler: boolean = !!roles.find(role => user.roles?.includes(role))

  if (checkRoler) {
     throw new Error(); 
  };
}
  req.user = user;

} catch (error) {
  throw new UnauthorizedException();
}

    return true;
  }
}
