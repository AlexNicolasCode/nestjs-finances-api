import { Module } from "@nestjs/common";

import { AuthService, BcryptService } from "./services";
import { JwtModule } from "src/modules/jwt";
import { UserEntity } from "src/database/entities";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
        ]),
        UserEntity,
        JwtModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        BcryptService,
    ],
})
export class AuthModule {}