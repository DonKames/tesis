const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/skus`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al obtener SKUS desde la API:', error);
        return [];
    }
};

export const createUser = async (skuData) => {
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

export const getUserById = async (skuId) => {
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
