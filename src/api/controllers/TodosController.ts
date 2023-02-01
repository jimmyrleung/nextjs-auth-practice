import type { NextApiResponse } from 'next'
import { NextApiRequestWithSession } from '../middlewares/withSession';
import { TodosRepository } from './TodosRepository';

export class TodosController {
    constructor(private todosRepository: TodosRepository) {
    }
    async getAll(req: NextApiRequestWithSession, res: NextApiResponse) {
        const todos = await this.todosRepository.getAllByUserId(req.session.userId);
        res.json(todos);
    }
    async create(req: NextApiRequestWithSession, res: NextApiResponse) {
        await this.todosRepository.create({
            ...req.body,
            userId: req.session.userId
        });
        res.status(201).json({});
    }
    async toggleDone(req: NextApiRequestWithSession, res: NextApiResponse) {
        const id = req.query.id as string;
        await this.todosRepository.toggleDone(parseInt(id));
        res.status(204).json({});
    }
    async remove(req: NextApiRequestWithSession, res: NextApiResponse) {
        const id = req.query.id as string;
        await this.todosRepository.remove(parseInt(id));
        res.status(204).json({});
    }
}
