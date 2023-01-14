import { Todo } from "../entities";
import { TodoItem } from "./TodoItem";

import styles from './TodosList.module.css';

export function TodosList(props: { todos: Todo[] }) {
    return (
        <div className={styles.wrapper}>
            {props.todos.map(todo => (
                <TodoItem className={styles.todoItem} key={todo.id} todo={todo} />
            ))}
        </div>
    );
}
