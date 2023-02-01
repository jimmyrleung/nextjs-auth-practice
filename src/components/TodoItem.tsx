import { Todo } from '../entities';
import styles from './TodoItem.module.css';
import { TodoItemDoneCheck } from './TodoItemDoneCheck';
import { TodoItemRemovebutton } from './TodoItemRemovebutton';

interface TodoItemProps {
    todo: Todo;
    className?: string;
    onToggleDone(id: number): Promise<void>;
    onRemoveClick(id: number): Promise<void>;
}

export function TodoItem({ todo, className = '', onToggleDone, onRemoveClick }: TodoItemProps) {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            <div>
                <p className={styles.title}>{todo.title}</p>
                <p className={styles.description}>{todo.description}</p>
            </div>
            <div className={styles.actionsWrapper}>
                <>
                    <TodoItemDoneCheck todo={todo} onToggleDone={onToggleDone} />
                    <TodoItemRemovebutton todo={todo} onRemoveClick={onRemoveClick} />
                </>
            </div>
        </div>
    );
}
