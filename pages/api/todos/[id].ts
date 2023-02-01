// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next'
import { TodosController } from '../../../src/api/controllers/TodosController';
import TodosRepositoryFactory from '../../../src/api/infra/TodosRepositoryFactory';
import { NextApiRequestWithSession, withSession } from '../../../src/api/middlewares/withSession';

const todosRepository = TodosRepositoryFactory.build();
const todosController = new TodosController(todosRepository);

type NextOperationsMap = {
    [key: string]: (req: NextApiRequestWithSession, res: NextApiResponse) => Promise<void>
}

const operations: NextOperationsMap = {
    PATCH: withSession(todosController.toggleDone.bind(todosController)),
    DELETE: withSession(todosController.remove.bind(todosController))
};

export default function handler(
    req: NextApiRequestWithSession,
    res: NextApiResponse
) {
    const method = req.method || '';
    if (operations[method]) return operations[method](req, res);

    res.status(404).json({
        message: 'Operation not Found'
    });
}
