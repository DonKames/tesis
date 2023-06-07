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
        const response = await fetch(`${BASE_URL}/users/id/${userId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        const msgError = await error.detail;
        console.log('Error al obtener USUARIO por ID desde la API:', msgError);
        return null;
    }
};

export const getUserByEmail = async (userEmail) => {
    console.log(userEmail);
    try {
        const response = await fetch(`${BASE_URL}/users/email/${userEmail}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = response.text() && response;
        return data;
    } catch (error) {
        console.log(error);
        const msgError = await error.detail;
        console.log(
            'Error al obtener USUARIO por EMAIL desde la API:',
            msgError,
        );
        return null;
    }
};

export const updateUserUid = async (email, uid) => {
    try {
        console.log(email, uid);
        const response = await fetch(`${BASE_URL}/users/email/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid }),
        });

        if (!response.ok) {
            const resp = await response.json();
            console.log(resp.error);
            throw new Error(resp.error.detail);
        }

        const data = await response.json();

        return { status: response.status, data };
    } catch (error) {
        console.log('Error al actualizar el UID de USUARIO en la API:', error);
        return error;
    }
};

export const updateUser = async (userId, updatedUserData) => {
    try {
        const response = await fetch(`${BASE_URL}/users/id/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
        });

        if (!response.ok) {
            const resp = await response.json();
            console.log(resp.error);
            throw new Error(resp.error.detail);
        }

        const data = await response.json();

        return { status: response.status, data };
    } catch (error) {
        console.log('Error al actualizar USUARIO en la API:', error);
        return error;
    }
};
