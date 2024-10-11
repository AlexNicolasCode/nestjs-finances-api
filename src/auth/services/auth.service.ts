import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateUserDto, SignInDto } from "../dtos";
import { UserEntity } from "src/database/entities";
import { JwtService } from 'src/jwt';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {
    constructor (
        private readonly jwtService: JwtService,
        private readonly bcryptService: BcryptService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async signIn(signInDto: SignInDto): Promise<{ token: string }> {
        const { email, password } = signInDto;
        const user = await this.userRepository.findOne({
            where: { email }
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const isValidPassword = this.bcryptService.compareTexts({ text: password, encrypt: user.password });
        if (!isValidPassword) {
            throw new NotFoundException('Invalid password');
        }
        const token = this.jwtService.generateToken({ id: user.id });
        return { token }
    }

    async createUser(createUserDto: CreateUserDto): Promise<{ email: string; token: string }> {
        const { email, password } = createUserDto;
        const user = this.userRepository.create();
        user.id = uuidv4(),
        user.email = email;
        user.password = await this.bcryptService.encryptText(password);
        this.userRepository.save(user);
        const token = this.jwtService.generateToken({ id: user.id });
        return { email, token }
    }
} 