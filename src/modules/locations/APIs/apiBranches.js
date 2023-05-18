require('dotenv').config();

const BASE_URL = process.env.BASE_URL;

export const getCountries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/branches`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al obtener países desde la API:', error);
        return [];
    }
};
