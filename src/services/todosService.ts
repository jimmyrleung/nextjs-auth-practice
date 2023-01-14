async function getAll() {
    const getAllResponse = await fetch('/api/todos', {
        headers: {
            'Content-type': 'application/json'
        }
    });

    if (!getAllResponse.ok) {
        alert('Something went wrong.');
    }
}

export type CreateTodoParams = {
    title: string;
    description: string;
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

export const todosService = {
    getAll,
    create
};
