import { AuthService } from './controllers/AuthController';
import { JWTAdapter } from './token/JWTAdapter';

// On purpose: will try to centralize everything here
const tokenModule = new JWTAdapter();
const authService = new AuthService(tokenModule);

export default class AuthServiceFactory {
    static build(): AuthService {
        return authService;
    }
}