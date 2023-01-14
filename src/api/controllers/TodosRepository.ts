import { Todo } from "../domain";

type CreateTodoParams = {
    userId: number;
    title: string;
    description: string;
}

export interface TodosRepository {
    getAllByUserId(userId: number): Todo[];
    create(params: CreateTodoParams): void;
}
