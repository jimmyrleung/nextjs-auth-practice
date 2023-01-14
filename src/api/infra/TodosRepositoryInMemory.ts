import { TodosRepository } from "../controllers/TodosRepository";
import { Todo } from "../domain";

const todos: Todo[] = [
    { id: 1, userId: 1, title: 'Study Next.js', description: 'Watch section 3', done: true },
    { id: 2, userId: 1, title: 'Study Node.js', description: 'Watch advanced event loop module', done: false },
    { id: 3, userId: 1, title: 'Study Postgres', description: 'Start learning the basics', done: false },

    { id: 4, userId: 2, title: 'Do the dishes', description: 'Watching One Piece', done: true },
    { id: 5, userId: 2, title: 'Groceries', description: 'Tomato sauce, pasta, garlic, wine', done: false },

    { id: 6, userId: 3, title: 'Review Fulano\'s PR', description: 'PR link http://their-awesome-pr.com', done: true },
    { id: 7, userId: 3, title: 'Go to the gym', description: 'Train B', done: false },
    { id: 8, userId: 3, title: 'Study Postgres', description: 'Start the indexes module', done: false },
    { id: 9, userId: 3, title: 'Study React', description: 'Continue the react hooks module', done: false }
];

let lastTodoId = todos[todos.length - 1].id || 0;

export class TodosRepositoryInMemory implements TodosRepository {
    create(params: { userId: number; title: string; description: string; }): void {
        lastTodoId++;
        const newTodo: Todo = {
            id: lastTodoId,
            done: false,
            ...params
        };
        todos.push(newTodo);
    }
    getAllByUserId(userId: number) {
        return todos.filter(todo => todo.userId === userId);
    }
}
