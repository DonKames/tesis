const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCountries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/countries`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al obtener países desde la API:', error);
        return [];
    }
};
