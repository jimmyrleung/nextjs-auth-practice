import { Todo } from "../domain";

type CreateTodoParams = {
    userId: number;
    title: string;
    description: string;
}

export interface TodosRepository {
    getAllByUserId(userId: number): Promise<Todo[]>;
    create(params: CreateTodoParams): Promise<void>;
}
