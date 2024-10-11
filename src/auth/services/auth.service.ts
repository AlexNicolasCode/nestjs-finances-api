import { v4 as uuidv4 } from 'uuid';
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateUserDto } from "../dtos";
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

    async createUser(createUserDto: CreateUserDto) {
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