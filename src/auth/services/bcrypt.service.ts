import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptService {
    encryptText(text: string) {
        const salt = process.env.SALT || 10000;
        return bcrypt.hash(text, salt);
    }
} 