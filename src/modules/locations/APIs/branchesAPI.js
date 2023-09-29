import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getBranches = async (
    page = 1,
    limit = 20,
    showInactive = false,
) => {
    try {
        const response = await fetch(
            `${BASE_URL}/branches?page=${page}&limit=${limit}&showInactive=${showInactive}`,
        );
        const data = await handleFetchError(response);
        return data;
    } catch (error) {
        console.log('Error al obtener Sucursales desde la API:', error);
        return [];
    }
};

export const getBranchById = async (branchId) => {
    try {
        const response = await fetch(`${BASE_URL}/branches/${branchId}`);
        const data = await handleFetchError(response);
        return data;
    } catch (error) {
        console.log('Error al obtener Sucursal desde la API:', error);
        return [];
    }
};

export const getBranchesQty = async (showInactive) => {
    try {
        const response = await fetch(
            `${BASE_URL}/branches/qty?showInactive=${showInactive}`,
        );
        const data = await handleFetchError(response);
        console.log('getBranches Data: ', data);
        return data;
    } catch (error) {
        console.log('Error al obtener Branches Qty desde la API:', error);
        return [];
    }
};

export const getBranchesNames = async () => {
    try {
        const response = await fetch(`${BASE_URL}/branches/names`);
        const data = await handleFetchError(response);
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error al obtener Branches Names desde la API:', error);
        return [];
    }
};

export const createBranch = async (branchData) => {
    try {
        console.log(branchData);
        const response = await fetch(`${BASE_URL}/branches`, {
            method: 'POST', // especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // especifica el tipo de contenido
            },
            body: JSON.stringify(branchData), // convierte los datos del país a una cadena JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error al crear Sucursal en la API:', error);
        return null;
    }
};

export const changeActiveStateBranch = async (branchId, activeState) => {
    try {
        const response = await fetch(`${BASE_URL}/branches/${branchId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ active: activeState }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(
            `Error al cambiar estado de Sucursal ${branchId} en la API: `,
            error,
        );

        return null;
    }
};

export const updateBranch = async (branchId, branchData) => {
    console.log(branchId, branchData);
    try {
        const response = await fetch(`${BASE_URL}/branches/${branchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(branchData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(
            `Error al actualizar Sucursal ${branchId} en la API: `,
            error,
        );

        return null;
    }
};
