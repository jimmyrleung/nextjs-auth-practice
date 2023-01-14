import { TodosRepository } from "../controllers/TodosRepository";
import { Todo } from "../domain";
import { DBConnection } from "./DBConnection";

export class TodosRepositoryDB implements TodosRepository {
    constructor(private connection: DBConnection) {
    }
    async getAllByUserId(userId: number): Promise<Todo[]> {
        const todos = await this.connection.query('SELECT * FROM todos WHERE userId = ?', [userId]);
        return todos;
    }
    async create(params: { userId: number; title: string; description: string; }): Promise<void> {
        const lastInsertedIdQuery = 'SELECT MAX(id) AS lastInsertedId FROM todos';
        const [{ lastInsertedId }] = await this.connection.query(lastInsertedIdQuery);

        const createQuery = 'INSERT INTO todos VALUES ($id, $userId, $title, $description, $done)';
        await this.connection.run(createQuery, {
            $id: lastInsertedId + 1,
            $userId: params.userId,
            $title: params.title,
            $description: params.description,
            $done: 0
        });
    }
}
