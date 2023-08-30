import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getSkusQty = async () => {
    try {
        const response = await fetch(`${BASE_URL}/skus/qty`);
        const finalResp = await handleFetchError(response);
        return finalResp;
    } catch (error) {
        console.log(
            'Error al obtener la cantidad de Skus desde la API:',
            error,
        );
        return [];
    }
};

export const getSkus = async (page = 1, limit = 20) => {
    try {
        const response = await fetch(
            `${BASE_URL}/skus?page=${page}&limit=${limit}`,
        );
        const finalResp = await handleFetchError(response);
        return finalResp;
    } catch (error) {
        console.log('Error al obtener SKUS desde la API:', error);
        return [];
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

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al crear SKU en la API:', error);
        return null;
    }
};

export const getSkuById = async (skuId) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${skuId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
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
        const response = await fetch(`${BASE_URL}/skus/active/${skuId}`, {
            method: 'UPDATE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(
            'Error al cambiar el estado Active SKU desde la API:',
            error,
        );
        return null;
    }
};
