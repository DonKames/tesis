import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getWarehouses = async (
    page = 1,
    limit = 20,
    showInactive = false,
) => {
    try {
        const response = await fetch(
            `${BASE_URL}/warehouses?page=${page}&limit=${limit}&showInactive=${showInactive}`,
        );
        const { status, data, message } = await handleFetchError(response);
        //
        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        return { data: null, error };
    }
};

export const getWarehouseById = async (warehouseId) => {
    try {
        //
        const response = await fetch(`${BASE_URL}/warehouses/${warehouseId}`);
        const { status, data, message } = await handleFetchError(response);

        //
        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        return { data: null, message: '' };
    }
};

export const getWarehousesQty = async ({ branchId, showInactive } = {}) => {
    try {
        let url = `${BASE_URL}/warehouses/qty`;

        const params = new URLSearchParams();

        //

        if (showInactive !== undefined) {
            params.append('showInactive', showInactive);
        }

        if (branchId !== undefined) {
            params.append('branchId', branchId);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        //

        const response = await fetch(url);

        //

        const { status, message, data } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        // console.log(
        //     'Error al obtener Cantidad de Bodegas desde la API:',
        //     error,
        // );
        return { data: null, message: error };
    }
};

export const getWarehousesNames = async () => {
    try {
        const response = await fetch(`${BASE_URL}/warehouses/names`);
        const data = await handleFetchError(response);
        return data;
    } catch (error) {
        return { data: null, message: error };
    }
};

export const createWarehouse = async (warehouseData) => {
    try {
        const response = await fetch(`${BASE_URL}/warehouses`, {
            method: 'POST', // especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // especifica el tipo de contenido
            },
            body: JSON.stringify(warehouseData), // convierte los datos del país a una cadena JSON
        });

        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        return { data: null, message: error };
    }
};

export const updateWarehouse = async (warehouseId, warehouseData) => {
    try {
        const response = await fetch(`${BASE_URL}/warehouses/${warehouseId}`, {
            method: 'PUT', // especifica el método HTTP
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
        return null;
    }
};

export const changeActiveStateWarehouse = async (warehouseId, activeState) => {
    try {
        const response = await fetch(`${BASE_URL}/warehouses/${warehouseId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ active: activeState }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(
            `Error al cambiar estado Activo de la Bodega ${warehouseId} en la API:`,
            error,
        );
        return null;
    }
};
