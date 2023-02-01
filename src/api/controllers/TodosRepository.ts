import { Todo } from "../domain";

type CreateTodoParams = {
    userId: number;
    title: string;
    description: string;
}

export interface TodosRepository {
    getAllByUserId(userId: number): Promise<Todo[]>;
    create(params: CreateTodoParams): Promise<void>;
    toggleDone(id: number): Promise<void>;
    remove(id: number): Promise<void>;
}
