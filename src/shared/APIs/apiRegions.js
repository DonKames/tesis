const BASE_URL = 'http://192.168.1.5:3000/api';

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
