import { Module } from "@nestjs/common";

import { AuthService, BcryptService, JwtService } from "./services";
import { UserEntity } from "src/database/entities";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
        ]),
        UserEntity,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        BcryptService,
        JwtService,
    ],
    exports: [JwtService]
})
export class AuthModule {}