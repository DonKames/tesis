import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getBranchLocations = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `${BASE_URL}/branchLocations?page=${page}&limit=${limit}`,
        );

        const finalResp = await handleFetchError(response);
        console.log(finalResp);
        return finalResp;
    } catch (error) {
        console.log(
            'Error al obtener Lugares de Sucursal desde la API: ',
            error,
        );
        return [];
    }
};

export const getBranchLocationsQty = async () => {
    try {
        const response = await fetch(`${BASE_URL}/branchLocations/qty`);
        const finalResp = await handleFetchError(response);
        console.log(finalResp);
        return finalResp;
    } catch (error) {
        console.log(
            'Error al obtener cantidad de Lugares de Sucursal desde la API: ',
            error,
        );
        return [];
    }
};

export const createBranchLocation = async (branchLocationData) => {
    try {
        console.log(branchLocationData);
        const response = await fetch(`${BASE_URL}/branchLocations`, {
            method: 'POST', // especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // especifica el tipo de contenido
            },
            body: JSON.stringify(branchLocationData), // convierte los datos del país a una cadena JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al crear Lugar de Sucursal en la API:', error);
        return null;
    }
};
