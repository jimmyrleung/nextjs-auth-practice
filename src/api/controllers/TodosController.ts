import type { NextApiRequest, NextApiResponse } from 'next'
import { NextApiRequestWithSession } from '../middlewares/withSession';
import { TodosRepository } from './TodosRepository';

export class TodosController {
    constructor(private todosRepository: TodosRepository) {
    }
    async getAll(req: NextApiRequestWithSession, res: NextApiResponse) {
        const todos = await this.todosRepository.getAllByUserId(1);
        res.json(todos);
    }
    async create(req: NextApiRequestWithSession, res: NextApiResponse) {
        console.log('todosController::req.session', req.session);
        await this.todosRepository.create({
            ...req.body,
            userId: req.session.userId
        });
        res.status(201).json({});
    }
}
