import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import appStyles from '../styles/app.module.css';
import styles from '../styles/todos.module.css';
import { PageContainer } from '../src/components/common';
import { CreateTodo } from '../src/components';
import { Todo } from '../src/entities';
import { Session, withSession } from '../src/hocs';
import TodosRepositoryFactory from '../src/api/infra/TodosRepositoryFactory';
import { TodosList } from '../src/components/TodosList';
import { todosService, CreateTodoParams } from '../src/services/todosService';
import { useSessionContext } from '../src/context/SessionContext';

type TodosPageProps = {
    todos: Todo[],
    session: Session
};

const TodosPage: NextPage<TodosPageProps> = (props) => {
    const [todos, setTodos] = useState(props.todos || []);
    const [_, dispatch] = useSessionContext();

    useEffect(() => dispatch(props.session));

    async function onCreateSubmit(params: CreateTodoParams) {
        if (params.title && params.description) {
            await todosService.create(params);
            const todos = await todosService.getAll();
            setTodos(todos);
        }
    }

    async function onToggleDone(id: number) {
        try {
            await todosService.toggleTodo(id);
            setTodos(todos => todos.map(todo => {
                if (todo.id !== id) return todo;
                return { ...todo, done: !todo.done };
            }));
        } catch (err) {
            alert('Something went wrong');
        }
    }

    async function onRemove(id: number) {
        try {
            await todosService.remove(id);
            setTodos(todos => todos.filter(todo => todo.id !== id));
        } catch (err) {
            alert('Something went wrong');
        }
    }

    return (
        <PageContainer className={appStyles.wrapper}>
            <div className={styles.wrapper}>
                <CreateTodo onSubmit={onCreateSubmit} />
                <TodosList
                    todos={todos}
                    onToggleDone={onToggleDone}
                    onRemoveClick={onRemove}
                />
            </div>
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
        const todosRepository = TodosRepositoryFactory.build();
        todos = await todosRepository.getAllByUserId(session.userId);
    }

    return { props: { todos, session } };
});
