import { Todo } from "../entities";
import { TodoItem } from "./TodoItem";

import styles from './TodosList.module.css';

type TodosListProps = {
    todos: Todo[];
    onToggleDone(id: number): Promise<void>;
};

export function TodosList(props: TodosListProps) {
    return (
        <div className={styles.wrapper}>
            {props.todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleDone={props.onToggleDone}
                    className={styles.todoItem}
                />
            ))}
        </div>
    );
}
