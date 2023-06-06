const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al obtener USUARIOS desde la API:', error);
        return error;
    }
};

export const createUser = async (userData) => {
    try {
        console.log(userData);
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const resp = await response.json();
            console.log(resp.error);
            throw new Error(resp.error.detail);
        }

        const data = await response.json();

        return { status: response.status, data };
    } catch (error) {
        console.log('Error al crear USUARIO en la API:', error);

        return error;
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        const msgError = await error.detail;
        console.log('Error al obtener USUARIOS por ID desde la API:', msgError);
        return null;
    }
};
