import { useState } from 'react';
import type { NextPage } from 'next';
import appStyles from '../styles/app.module.css';
import styles from '../styles/todos.module.css';
import { PageContainer } from '../src/components/common';
import { TodoItem } from '../src/components';
import { Todo } from '../src/entities';
import { Session, withSession } from '../src/hocs';
import { TodosRepository } from '../src/api/infra/TodosRepository';

const TodosPage: NextPage<{ todos: Todo[] }> = (props) => {
    const [todos, setTodos] = useState(props.todos || []);
    return (
        <PageContainer className={appStyles.wrapper}>
            {todos.map(todo => (
                <TodoItem className={styles.todoItem} key={todo.id} todo={todo} />
            ))}
        </PageContainer>
    )
}

export default TodosPage;

export const getServerSideProps = withSession(async (session: Session) => {
    if (!session.isValid) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        };
    }

    let todos: Todo[] = [];

    // TODO: once we move to an external API, we'll be using a gateway to get that
    if (session.userId) {
        const todosRepository = new TodosRepository();
        todos = todosRepository.getAllByUserId(session.userId);
    }

    return { props: { todos } };
});
