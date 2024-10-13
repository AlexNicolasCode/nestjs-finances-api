import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./services/auth.service";
import { CreateUserDto, SignInDto } from "./dtos";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('sign-in')
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto);
    }

    @Post('users')
    createUser(@Body() dto: CreateUserDto) {
        return this.authService.createUser(dto);
    }
}