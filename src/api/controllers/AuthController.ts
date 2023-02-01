import type { NextApiRequest, NextApiResponse } from 'next'
import { TokenModule } from "./TokenModule";
import { setCookie } from 'nookies'

const users = [
    {
        id: 1,
        email: 'user1@test.com',
        password: 'senha123',
        roles: ['todo:view']
    },
    {
        id: 2,
        email: 'user2@test.com',
        password: 'senha456',
        roles: ['todo:view', 'todo:create', 'todo:toggle']
    },
    {
        id: 3,
        email: 'user3@test.com',
        password: 'senha789',
        roles: ['todo:view', 'todo:create', 'todo:toggle', 'todo:delete']
    }
];

export class AuthController {
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

        const accessToken = this.tokenModule.create('access', { id: user?.id, roles: user.roles });
        const refreshToken = this.tokenModule.create('refresh', { id: user?.id, roles: user.roles });

        setCookie({ res }, 'ACCESS_TOKEN_KEY', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
        });

        setCookie({ res }, 'REFRESH_TOKEN_KEY', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
        });

        res.status(200).json({});
    }
}
