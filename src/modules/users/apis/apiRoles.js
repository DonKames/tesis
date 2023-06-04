const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getRoles = async () => {
    try {
        const response = await fetch(`${BASE_URL}/roles`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al obtener Roles desde la API:', error);
        return [];
    }
};

export const createRole = async (roleData) => {
    try {
        console.log(roleData);
        const response = await fetch(`${BASE_URL}/roles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roleData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al crear Rol en la API:', error);
        return null;
    }
};
