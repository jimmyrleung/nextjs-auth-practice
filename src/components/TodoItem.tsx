import { Todo } from '../entities';
import { Button } from './common';
import styles from './TodoItem.module.css';

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
                <input
                    type='checkbox'
                    checked={todo.done}
                    className={styles.doneCheck}
                    onChange={() => onToggleDone(todo.id!)}
                />
                <Button onClick={() => onRemoveClick(todo.id!)}>Remove</Button>
            </div>
        </div>
    );
}
