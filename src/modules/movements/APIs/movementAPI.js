import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMovements = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movements`);
        const { status, data, message } = await handleFetchError(response);
        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al obtener Movimientos desde la API:', error);
        return { data: null, error };
    }
};

export const getMovementById = async (movementId) => {
    try {
        const response = await fetch(`${BASE_URL}/movements/${movementId}`);
        const { status, data, message } = await handleFetchError(response);
        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al obtener Movimiento desde la API:', error);
        return { data: null, error };
    }
};

export const getLastAddedProducts = async (limit = 5) => {
    try {
        // Asegúrate de que la URL coincida con la ruta definida en el servidor para obtener los últimos productos agregados
        const response = await fetch(
            `${BASE_URL}/movements/last-added?limit=${limit}`,
        );
        const { status, data, message } = await handleFetchError(response);
        if (status === 'success') {
            // La API devuelve los últimos productos agregados según el límite especificado
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log(
            'Error al obtener los últimos productos agregados desde la API:',
            error,
        );
        return { data: null, error };
    }
};

export const createMovement = async (movementData) => {
    try {
        const response = await fetch(`${BASE_URL}/movements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movementData),
        });
        const { status, data, message } = await handleFetchError(response);
        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al crear Movimiento en la API:', error);
        return { data: null, error };
    }
};

export const updateMovement = async (movementId, movementData) => {
    try {
        const response = await fetch(`${BASE_URL}/movements/${movementId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movementData),
        });
        const { status, data, message } = await handleFetchError(response);
        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al actualizar Movimiento en la API:', error);
        return { data: null, error };
    }
};

export const deleteMovement = async (movementId) => {
    try {
        const response = await fetch(`${BASE_URL}/movements/${movementId}`, {
            method: 'DELETE',
        });
        const { status, data, message } = await handleFetchError(response);
        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al eliminar Movimiento en la API:', error);
        return { data: null, error };
    }
};
