import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProducts = async (
    page = 1,
    limit = 10,
    showInactive = false,
) => {
    try {
        const response = await fetch(
            `${BASE_URL}/products?page=${page}&limit=${limit}&showInactive=${showInactive}`,
        );
        const { data, status, message } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        // console.log('Error al obtener Productos desde la API:', error);
        return { data: null, message: error };
    }
};
export const getProductsQty = async ({ warehouseId, showInactive }) => {
    // console.log(showInactive);
    // console.log(warehouseId);
    try {
        let url = `${BASE_URL}/products/qty`;

        const params = new URLSearchParams();

        if (showInactive !== undefined) {
            params.append('showInactive', showInactive);
        }

        if (warehouseId !== undefined) {
            params.append('warehouseId', warehouseId);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        // console.log(url);

        const response = await fetch(url);

        // console.log(response);

        const { status, data, message } = await handleFetchError(response);

        console.log(status, data, message);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al obtener Productos desde la API:', error);
        return { data: null, message: error };
    }
};

export const searchProducts = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}/products/search?query=${query}`,
        );
        const { status, data, message } = await handleFetchError(response);
        if (status === 'success') {
            return data;
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al buscar productos desde la API:', error);
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

export const getProductsByWarehouse = async (warehouseId) => {
    try {
        const response = await fetch(
            `${BASE_URL}/products/warehouse/${warehouseId}`,
        );
        const data = await handleFetchError(response);
        return data;
    } catch (error) {
        console.log(
            'Error al obtener productos por bodega desde la API:',
            error,
        );
        return [];
    }
};

export const getProductByEPC = async (epc) => {
    try {
        const url = `${BASE_URL}/products/epc/${encodeURIComponent(epc)}`;
        const response = await fetch(url);

        // console.log(response);
        // const data = await handleFetchError(response);

        // console.log(data);
        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al obtener Producto por EPC desde la API:', error);
        return { data: null, message: error.message || 'Error desconocido' };
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

        const { data, status, message } = await handleFetchError(response);

        // console.log('createProduct: ', status, data, message);
        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al crear Producto en la API:', error);
        return { data: null, message: error };
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${productId}`);

        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return data;
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log('Error al obtener Producto por ID desde la API:', error);
        return null;
    }
};

export const changeActiveStateProduct = async (productId, activeState) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${productId}`, {
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
            `Error al cambiar el estado de activo del Producto ${productId} en la API:`,
            error,
        );
        return null;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(
            `Error al actualizar el Producto ${productId} en la API:`,
            error,
        );
        return null;
    }
};
