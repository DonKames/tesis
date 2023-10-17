const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getCountries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/countries`);
        const { data, status } = await response.json();

        if (status === 'success') {
            return data;
        } else {
            throw new Error('Error al obtener países desde la API');
        }
    } catch (error) {
        console.log('Error al obtener países desde la API:', error);
        return [];
    }
};
