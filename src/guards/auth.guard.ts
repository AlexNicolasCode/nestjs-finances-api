import { DataSource } from "typeorm";
import { Injectable, CanActivate, ExecutionContext, UnprocessableEntityException } from "@nestjs/common";

import { UserEntity } from "src/database/entities";
import { JwtService } from "src/modules/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private readonly jwtService: JwtService,
    ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const token = this.getToken(request);
    // const isValid = await this.jwtService.verifyToken(token);
    // if (!isValid) {
    //     throw new UnprocessableEntityException('Invalid token');
    // }
    const tokenPayload = this.jwtService.descript(token) as any;
    request['user'] = { id: tokenPayload?.id };
    return true;
  }

  private getToken(request) {
    const [type, token] = request.headers['authorization'].split(' ');
    if (type !== 'Bearer') {
        throw new UnprocessableEntityException('Invalid token');
    }
    return token;
  }
}