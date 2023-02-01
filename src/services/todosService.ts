export type CreateTodoParams = {
    title: string;
    description: string;
}

async function getAll() {
    const getAllResponse = await fetch('/api/todos', {
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (getAllResponse.ok) {
        const responseJson = await getAllResponse.json();
        return responseJson;
    }
}

async function create(params: CreateTodoParams) {
    const createResponse = await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    if (!createResponse.ok) {
        throw new Error('Something went wrong while creating a new todo')
    }
}

async function toggleTodo(id: number) {
    const toggleTodoResponse = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (!toggleTodoResponse.ok) {
        throw new Error('Something went wrong while completing a todo')
    }
}

async function remove(id: number) {
    const removeTodoResponse = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (!removeTodoResponse.ok) {
        throw new Error('Something went wrong while deleting a todo')
    }
}

export const todosService = {
    getAll,
    create,
    toggleTodo,
    remove
};
