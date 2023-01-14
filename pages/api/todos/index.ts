// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TodosController } from '../../../src/api/controllers/TodosController';
import TodosRepositoryFactory from '../../../src/api/infra/TodosRepositoryFactory';

const todosRepository = TodosRepositoryFactory.build();
const todosController = new TodosController(todosRepository);

const operations: { [key: string]: (req: NextApiRequest, res: NextApiResponse) => void } = {
    GET: todosController.getAll.bind(todosController),
    POST: todosController.create.bind(todosController)
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
