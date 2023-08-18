import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProducts = async (page = 1, limit = 50) => {
    try {
        const response = await fetch(
            `${BASE_URL}/products?page=${page}&limit=${limit}`,
        );
        const data = await handleFetchError(response);
        console.log('getProducts Data: ', data);
        return data;
    } catch (error) {
        console.log('Error al obtener Productos desde la API:', error);
        return [];
    }
};
export const getProductsQty = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products/qty`);
        const data = await response.json();
        console.log('getProducts Data: ', data);
        return data;
    } catch (error) {
        console.log('Error al obtener Productos desde la API:', error);
        return [];
    }
};

export const getProductsCountByWarehouse = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products/countByWarehouse`);
        const data = await handleFetchError(response);
        return data;
    } catch (error) {
        console.log(
            'Error al obtener la cantidad de productos por bodega desde la API:',
            error,
        );
        return [];
    }
};

export const createProduct = async (productData) => {
    try {
        console.log(productData);
        const response = await fetch(`${BASE_URL}/products`, {
            method: 'POST', // especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // especifica el tipo de contenido
            },
            body: JSON.stringify(productData), // convierte los datos del país a una cadena JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al crear Producto en la API:', error);
        return null;
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al obtener Producto por ID desde la API:', error);
        return null;
    }
};
