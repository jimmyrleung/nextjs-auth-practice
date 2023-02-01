import { Todo } from "../entities";
import { withRoleCheck } from "../hocs";
import { TodoItem } from "./TodoItem";

import styles from './TodosList.module.css';

type TodosListProps = {
    todos: Todo[];
    onToggleDone(id: number): Promise<void>;
    onRemoveClick(id: number): Promise<void>;
};

function TodosListComponent(props: TodosListProps) {
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

export const TodosList = withRoleCheck(TodosListComponent, 'todo:view');
