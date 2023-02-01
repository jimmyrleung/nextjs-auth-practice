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
        alert('Something went wrong.');
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
        alert('Something went wrong');
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
        alert('Something went wrong');
    }
}

export const todosService = {
    getAll,
    create,
    toggleTodo,
    remove
};
