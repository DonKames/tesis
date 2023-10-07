import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getBranchLocations = async (
    page = 1,
    limit = 10,
    showInactive = false,
) => {
    try {
        const response = await fetch(
            `${BASE_URL}/branchLocations?page=${page}&limit=${limit}&showInactive=${showInactive}`,
        );

        const { status, data } = await handleFetchError(response);
        // console.log(finalResp);

        if (status === 'success') {
            return data;
        }
        return [];
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
        const { status, data } = await handleFetchError(response);
        // console.log(finalResp);
        if (status === 'success') {
            return data;
        }

        return 0;
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

export const changeBranchLocationState = async (branchLocationId, state) => {
    try {
        const response = await fetch(
            `${BASE_URL}/branchLocations/${branchLocationId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ state }),
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(
            `Error al cambiar estado de Lugar de Sucursal en la API: ${error}`,
        );
        return null;
    }
};

export const updateBranchLocation = async (
    branchLocationId,
    branchLocationData,
) => {
    console.log(branchLocationId, branchLocationData);
    try {
        const response = await fetch(
            `${BASE_URL}/branchLocations/${branchLocationId}`,
            {
                method: 'PUT', // especifica el método HTTP
                headers: {
                    'Content-Type': 'application/json', // especifica el tipo de contenido
                },
                body: JSON.stringify(branchLocationData), // convierte los datos del país a una cadena JSON
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al actualizar Lugar de Sucursal en la API:', error);
        return null;
    }
};
