const BASE_URL = 'http://192.168.1.2:3000/api';

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
