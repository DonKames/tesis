const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMunicipalities = async () => {
    try {
        const response = await fetch(`${BASE_URL}/municipalities`);
        const { data, status } = await response.json();

        if (status === 'success') {
            return data;
        } else {
            throw new Error('Error al obtener comunas desde la API');
        }
    } catch (error) {
        console.log('Error al obtener comunas desde la API:', error);
        return [];
    }
};
