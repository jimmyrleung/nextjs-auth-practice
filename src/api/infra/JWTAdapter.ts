import jwt from 'jsonwebtoken';
import { TokenModule } from "../controllers";

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;

export class JWTAdapter implements TokenModule {
    private getKeyByType(type: "access" | "refresh") {
        const key = type === 'access'
            ? ACCESS_TOKEN_KEY : REFRESH_TOKEN_KEY;

        if (!key) throw new Error(`Token key for type '${type}' is not defined.`);
        return key;
    }
    private getOptionsByType(type: "access" | "refresh"): jwt.SignOptions {
        const expiresIn = type === 'access'
            ? '20s' : '60s';

        return { expiresIn };
    }
    create(type: "access" | "refresh", payload: any) {
        const key = this.getKeyByType(type);
        const options = this.getOptionsByType(type);
        return jwt.sign(payload, key, options);
    }
    verify(token: string, type: "access" | "refresh") {
        const key = this.getKeyByType(type);
        try {
            jwt.verify(token, key);
            return true;
        } catch (err) {
            console.log('JWTAdapter::verify', err);
            return false;
        }
    }
    decode(token: string) {
        return jwt.decode(token, { complete: true });
    }
}