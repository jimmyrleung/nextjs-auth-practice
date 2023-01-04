import type { NextPage } from 'next';
import appStyles from '../styles/app.module.css';
import styles from '../styles/todos.module.css';
import { PageContainer } from '../src/components/common';
import { TodoItem } from '../src/components';
import { Todo } from '../src/entities';

const now = Date.now();
const todos: Todo[] = [
    { id: now, title: 'Study Next.js', description: 'Watch section 3', done: true },
    { id: now + 1, title: 'Study Node.js', description: 'Watch advanced event loop module', done: false },
    { id: now + 2, title: 'Study Postgres', description: 'Start learning the basics', done: false },
];

const TodosPage: NextPage = () => {
    return (
        <PageContainer className={appStyles.wrapper}>
            {todos.map(todo => (
                <TodoItem className={styles.todoItem} key={todo.id} todo={todo} />
            ))}
        </PageContainer>
    )
}

export default TodosPage;
