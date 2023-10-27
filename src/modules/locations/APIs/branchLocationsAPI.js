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

        const { status, data, message } = await handleFetchError(response);
        // console.log(finalResp);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log(
            'Error al obtener Lugares de Sucursal desde la API: ',
            error,
        );
        return { data: null, error };
    }
};

export const getBranchLocationById = async (branchLocationId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/branchLocations/${branchLocationId}`,
        );

        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al obtener Lugar de Sucursal desde la API: ', error);
        return { data: null, message: '' };
    }
};

export const getBranchLocationsQty = async ({ branchId, showInactive }) => {
    try {
        let url = `${BASE_URL}/branchLocations/qty`;

        const params = new URLSearchParams();

        if (showInactive !== undefined) {
            params.append('showInactive', showInactive);
        }

        if (branchId !== undefined) {
            params.append('branchId', branchId);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(url);

        const { status, message, data } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }

        // const { status, data } = await handleFetchError(response);
        // const response = await fetch(`${BASE_URL}/branchLocations/qty`);
        // // console.log(finalResp);
        // if (status === 'success') {
        //     return data;
        // }

        // return 0;
    } catch (error) {
        console.log(
            'Error al obtener cantidad de Lugares de Sucursal desde la API: ',
            error,
        );
        return { data: null, error };
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
        return { data: null, error };
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
        return { data: null, error };
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
        return { data: null, error };
    }
};
