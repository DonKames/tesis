import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUsers = async (page = 1, limit = 10, showInactive = false) => {
    try {
        const response = await fetch(
            `${BASE_URL}/users?page=${page}&limit=${limit}&showInactive=${showInactive}`,
        );

        const { status, data } = await handleFetchError(response);

        if (status === 'success') {
            return data;
        }
        return [];
    } catch (error) {
        console.log('Error al obtener USUARIOS desde la API:', error);
        return [];
    }
};

export const getUsersQty = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users/qty`);
        const data = await handleFetchError(response);
        return data;
    } catch (error) {
        console.log(
            'Error al obtener la CANTIDAD DE USUARIOS desde la API:',
            error,
        );
        return [];
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

export const getUserByUid = async (userUid) => {
    try {
        const response = await fetch(`${BASE_URL}/users/uid/${userUid}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');

        let data;

        if (contentType && contentType.indexOf('application/json') !== -1) {
            // Comprobar si el cuerpo de la respuesta está vacío
            if (response.status !== 204) {
                data = await response.json();
            }
        } else {
            data = await response.text();
        }

        // data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        const msgError = await error.detail;
        console.log('Error al obtener USUARIO por ID desde la API:', msgError);
        return null;
    }
};

export const getUserByEmail = async (userEmail) => {
    // console.log(userEmail);
    try {
        const response = await fetch(`${BASE_URL}/users/email/${userEmail}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');

        let data;

        if (contentType && contentType.indexOf('application/json') !== -1) {
            // Comprobar si el cuerpo de la respuesta está vacío
            if (response.status !== 204) {
                data = await response.json();
            }
        } else {
            data = await response.text();
        }

        // const data = (await response.text()) && (await response.json());
        console.log(data);
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
