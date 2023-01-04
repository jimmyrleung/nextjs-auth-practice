import type { NextApiRequest, NextApiResponse } from 'next'
import { TokenModule } from "./TokenModule";

const users = [
    { id: 1, email: 'user1@test.com', password: 'senha123', roles: [] },
    { id: 2, email: 'user2@test.com', password: 'senha456', roles: [] },
    { id: 3, email: 'user3@test.com', password: 'senha789', roles: [] },
];

export class AuthService {
    constructor(private tokenModule: TokenModule) { }

    login(req: NextApiRequest, res: NextApiResponse) {
        const credentials = req.body;
        const user = users.find(u => u.email === credentials.email);

        if (!user) {
            console.error(`User not found.`);
            return res.status(401).json({
                message: 'The user does not exist or the credentials are invalid.'
            });
        }

        if (user && user.password !== credentials.password) {
            console.error(`Invalid password.`);
            return res.status(401).json({
                message: 'The user does not exist or the credentials are invalid.'
            });
        }

        res.status(200).json({
            accessToken: this.tokenModule.create('access', { id: user?.id }),
            refreshToken: this.tokenModule.create('refresh', { id: user?.id })
        });
    }
}
