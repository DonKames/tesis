import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getGlobalSettings = async () => {
    try {
        const response = await fetch(`${BASE_URL}/global_settings`);
        const finalResp = await handleFetchError(response);
        const data = {
            id: finalResp.global_settings_id,
            mainBranch: finalResp.main_branch,
            mainWarehouse: finalResp.main_warehouse,
        };
        return data;
    } catch (error) {
        console.log('Error al obtener Settings desde la API:', error);
        return [];
    }
};

export const createGlobalSettings = async (settingsData) => {
    try {
        const response = await fetch(`${BASE_URL}/global_settings`, {
            method: 'POST', // especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // especifica el tipo de contenido
            },
            body: JSON.stringify(settingsData), // convierte los datos del país a una cadena JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al crear Settings en la API:', error);
        return null;
    }
};

export const updateGlobalSettings = async (settingsData) => {
    try {
        const response = await fetch(`${BASE_URL}/global_settings`, {
            method: 'PUT', // especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // especifica el tipo de contenido
            },
            body: JSON.stringify(settingsData), // convierte los datos del país a una cadena JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al actualizar Settings en la API:', error);
        return null;
    }
};
