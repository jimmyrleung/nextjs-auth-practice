import { AuthController } from './controllers/AuthController';
import { JWTAdapter } from './infra/JWTAdapter';

// On purpose: will try to centralize everything here
const tokenModule = new JWTAdapter();
const authService = new AuthController(tokenModule);

export default class AuthControllerFactory {
    static build(): AuthController {
        return authService;
    }
}