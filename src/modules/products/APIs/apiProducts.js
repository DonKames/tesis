const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al obtener Productos desde la API:', error);
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
