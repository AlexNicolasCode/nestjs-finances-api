import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./services/auth.service";
import { CreateUserDto } from "./dtos";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('users')
    createUser(@Body() dto: CreateUserDto) {
        return this.authService.createUser(dto);
    }
}