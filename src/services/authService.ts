import { Credentials } from "../entities";

async function login(credentials: Credentials) {
    const loginResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (!loginResponse.ok) {
        if (loginResponse.status === 401) {
            alert('Invalid credentals.');
        } else {
            alert('Something went wrong.');
        }
    }
}

export const authService = {
    login
};
