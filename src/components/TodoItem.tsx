import { Todo } from '../entities';
import styles from './TodoItem.module.css';

interface TodoItemProps {
    todo: Todo;
    className?: string;
    onToggleDone(id: number): Promise<void>;
}

export function TodoItem({ todo, className = '', onToggleDone }: TodoItemProps) {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            <div>
                <p className={styles.title}>{todo.title}</p>
                <p className={styles.description}>{todo.description}</p>
            </div>
            <div>
                <input
                    type='checkbox'
                    checked={todo.done}
                    className={styles.doneCheck}
                    onChange={() => onToggleDone(todo.id!)}
                />
            </div>
        </div>
    );
}
