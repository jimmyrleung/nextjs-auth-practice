import { NextApiRequest, NextApiResponse } from 'next'
import { JWTAdapter } from '../infra/JWTAdapter';

export type NextApiRequestWithSession = NextApiRequest & {
    session: { userId: number }
};

type NextApiRequestHandler = (req: NextApiRequestWithSession, res: NextApiResponse) => Promise<void>;

export const withSession = (handler: NextApiRequestHandler) => {
    return async (req: NextApiRequestWithSession, res: NextApiResponse) => {
        const accessToken = req.cookies["ACCESS_TOKEN_KEY"];

        if (!accessToken) {
            // TODO: handle when adding token validation for the API
            throw new Error('Invalid access token.');
        }
        const jwtAdapter = new JWTAdapter();
        const jwtPayload = jwtAdapter.decode(accessToken);

        // @ts-ignore
        req.session = { userId: jwtPayload?.payload.id };
        await handler(req, res);
    }
}
