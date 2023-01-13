// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TodosController } from '../../../src/api/controllers/TodosController';

const todosController = new TodosController();

const operations: { [key: string]: (req: NextApiRequest, res: NextApiResponse) => void } = {
    GET: todosController.getAll.bind(todosController)
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
