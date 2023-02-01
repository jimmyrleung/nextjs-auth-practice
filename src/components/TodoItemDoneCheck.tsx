import { Todo } from '../entities';
import { withRoleCheck } from '../hocs';
import styles from './TodoItem.module.css';

const TodoItemDoneCheckComponent = (props: { todo: Todo, onToggleDone: (id: number) => Promise<void> }) => {
    return (
        <input
            type='checkbox'
            checked={props.todo.done}
            className={styles.doneCheck}
            onChange={() => props.onToggleDone(props.todo.id!)}
        />
    );
}

export const TodoItemDoneCheck = withRoleCheck(TodoItemDoneCheckComponent, 'todo:toggle');
