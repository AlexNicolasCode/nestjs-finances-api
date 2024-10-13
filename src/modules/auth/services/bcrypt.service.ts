import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptService {
    encryptText(text: string): Promise<string> {
        const salt = process.env.SALT || 10000;
        return bcrypt.hash(text, salt);
    }
    
    compareTexts({ text, encrypt }: { text: string; encrypt: string }): Promise<boolean> {
        return bcrypt.compare(text, encrypt);
    }
} 