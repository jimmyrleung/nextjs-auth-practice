import type { NextApiRequest, NextApiResponse } from 'next'
import { TodosRepository } from './TodosRepository';

// TODO: check Next middleware to validate the token
export class TodosController {
    constructor(private todosRepository: TodosRepository) {
    }
    async getAll(req: NextApiRequest, res: NextApiResponse) {
        const todos = this.todosRepository.getAllByUserId(1);
        res.json(todos);
    }
    async create(req: NextApiRequest, res: NextApiResponse) {
        const todos = this.todosRepository.create(req.body);
        res.json(todos);
    }
}
