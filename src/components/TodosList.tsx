import { Todo } from "../entities";
import { TodoItem } from "./TodoItem";

import styles from './TodosList.module.css';

type TodosListProps = {
    todos: Todo[];
    onToggleDone(id: number): Promise<void>;
    onRemoveClick(id: number): Promise<void>;
};

export function TodosList(props: TodosListProps) {
    return (
        <div className={styles.wrapper}>
            {props.todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    className={styles.todoItem}
                    onToggleDone={props.onToggleDone}
                    onRemoveClick={props.onRemoveClick}
                />
            ))}
        </div>
    );
}
