import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getSkus = async (
    page = 1,
    limit = 10,
    showInactive = false,
    searchTerm,
) => {
    try {
        const response = await fetch(
            `${BASE_URL}/skus?page=${page}&limit=${limit}&showInactive=${showInactive}&searchTerm=${searchTerm}`,
        );

        // console.log(response);
        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al obtener SKUS desde la API:', error);
        return { data: null, message: error };
    }
};

export const getSkusQty = async ({ skuId, showInactive }) => {
    try {
        let url = `${BASE_URL}/skus/qty`;

        const params = new URLSearchParams();

        if (showInactive !== undefined) {
            params.append('showInactive', showInactive);
        }

        if (skuId !== undefined) {
            params.append('skuId', skuId);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(url);

        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log(
            'Error al obtener la cantidad de Skus desde la API:',
            error,
        );
        return { data: null, message: error };
    }
};

export const getSkusNames = async () => {
    try {
        const response = await fetch(`${BASE_URL}/skus/names`);
        // return await handleFetchError(response);
        const finalResp = await handleFetchError(response);
        return finalResp;
    } catch (error) {
        console.log('Error al obtener SKUS Names desde la API:', error);
        return [];
    }
};

export const getSkusWithLowInventory = async () => {
    try {
        const response = await fetch(`${BASE_URL}/skus/skusWithLowInventory`);
        // return await handleFetchError(response);
        const { data, status, message } = await handleFetchError(response);
        // console.log(data);
        if (status === 'success') {
            return { data, message };
        }
    } catch (error) {
        console.log(
            'Error al obtener SKUS con inventario bajo desde la API:',
            error,
        );
        return [];
    }
};

export const getProductCountInWarehousesBySku = async (skuIds) => {
    try {
        const response = await fetch(
            `${BASE_URL}/skus/getProductsCountInWarehouses`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ skuIds }), // Enviamos el array de IDs como JSON
            },
        );

        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log(
            'Error al obtener la cantidad de productos en bodegas por SKU desde la API:',
            error,
        );
        return { data: null, message: error };
    }
};

export const createSku = async (skuData) => {
    try {
        console.log(skuData);
        const response = await fetch(`${BASE_URL}/skus`, {
            method: 'POST', // especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // especifica el tipo de contenido
            },
            body: JSON.stringify(skuData), // convierte los datos del país a una cadena JSON
        });

        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return data;
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al crear SKU en la API:', error);
        return null;
    }
};

export const getSkuById = async (skuId) => {
    try {
        const response = await fetch(`${BASE_URL}/skus/${skuId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return data;
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al obtener SKU por ID desde la API:', error);
        return null;
    }
};

export const getSkuBySku = async (sku) => {
    try {
        console.log('llega al get sku by sku');
        const response = await fetch(`${BASE_URL}/skus/sku/${sku}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al obtener Producto por SKU desde la API:', error);
        return null;
    }
};

export const changeActiveStateSku = async (skuId, data) => {
    try {
        const response = await fetch(`${BASE_URL}/skus/${skuId}`, {
            method: 'PATCH', // o 'PATCH' dependiendo de tu API
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ active: data }), // Aquí enviamos la data
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(
            'Error al cambiar el estado Active SKU desde la API:',
            error,
        );
        return null;
    }
};

export const updateSku = async (skuId, data) => {
    try {
        const response = await fetch(`${BASE_URL}/skus/${skuId}`, {
            method: 'PUT', // o 'PATCH' dependiendo de tu API
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Aquí enviamos la data
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log('Error al actualizar SKU desde la API:', error);
        return null;
    }
};
