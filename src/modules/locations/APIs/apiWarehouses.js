import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getWarehouses = async (page = 1, limit = 20) => {
    try {
        const response = await fetch(
            `${BASE_URL}/warehouses?page=${page}&limit=${limit}`,
        );
        const finalResp = await handleFetchError(response);
        console.log(finalResp);
        return finalResp;
    } catch (error) {
        console.log('Error al obtener Bodegas desde la API:', error);
        return [];
    }
};

export const getWarehousesQty = async () => {
    try {
        const response = await fetch(`${BASE_URL}/warehouses/qty`);
        const finalResp = await handleFetchError(response);
        console.log(finalResp);
        return finalResp;
    } catch (error) {
        console.log(
            'Error al obtener Cantidad de Bodegas desde la API:',
            error,
        );
        return [];
    }
};

export const createWarehouse = async (warehouseData) => {
    try {
        console.log(warehouseData);
        const response = await fetch(`${BASE_URL}/warehouses`, {
            method: 'POST', // especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // especifica el tipo de contenido
            },
            body: JSON.stringify(warehouseData), // convierte los datos del país a una cadena JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al crear Bodega en la API:', error);
        return null;
    }
};
