import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtService {
    private secretKey: string = uuidv4();

    generateToken({ id }: { id: string }) {
        return jwt.sign({ id }, this.secretKey)
    }

    verifyToken(token: string) {
        return !!jwt.verify(token, this.secretKey);
    }

    descript(token: string) {
        return jwt.decode(token);
    }
}