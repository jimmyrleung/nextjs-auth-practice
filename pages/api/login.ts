// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import AuthServiceFactory from '../../api/AuthServiceFactory';

const authService = AuthServiceFactory.build();

const operations: { [key: string]: (req: NextApiRequest, res: NextApiResponse) => void } = {
    POST: authService.login.bind(authService)
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method || '';
    if (operations[method]) return operations[method](req, res);

    res.status(404).json({
        message: 'Operation not Found'
    });
}
