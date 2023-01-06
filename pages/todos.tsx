import type { NextPage } from 'next';
import appStyles from '../styles/app.module.css';
import styles from '../styles/todos.module.css';
import { PageContainer } from '../src/components/common';
import { TodoItem } from '../src/components';
import { Todo } from '../src/entities';
import { Session, SESSION_STATE, withSession } from '../src/hocs';

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

export const getServerSideProps = withSession((session: Session) => {
    const { state } = session;

    // TODO: abstract this logic so we don't have to configure this callback in every page
    if (state === SESSION_STATE.VALID || state === SESSION_STATE.REFRESHED) {
        return { props: {} };
    }

    if (state === SESSION_STATE.EMPTY || state === SESSION_STATE.EXPIRED) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        };
    }
});

