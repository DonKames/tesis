const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getRegions = async () => {
    try {
        const response = await fetch(`${BASE_URL}/regions`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al obtener regions desde la API:', error);
        return [];
    }
};
