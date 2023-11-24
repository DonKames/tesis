import { handleFetchError } from '../../../shared/utils/handleFetchError';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getBranches = async (
    page = 1,
    limit = 20,
    showInactive = false,
    searchTerm,
) => {
    try {
        const response = await fetch(
            `${BASE_URL}/branches?page=${page}&limit=${limit}&showInactive=${showInactive}&searchTerm=${searchTerm}`,
        );
        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        return { data: null, message: error };
    }
};

export const getBranchById = async (branchId) => {
    try {
        const response = await fetch(`${BASE_URL}/branches/${branchId}`);
        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        return { data: null, message: error };
    }
};

export const getBranchesQty = async ({ warehouseId, showInactive }) => {
    try {
        let url = `${BASE_URL}/branches/qty`;

        const params = new URLSearchParams();

        if (showInactive !== undefined) {
            params.append('showInactive', showInactive);
        }

        if (warehouseId !== undefined) {
            params.append('warehouseId', warehouseId);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(url);

        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
        // return data;
    } catch (error) {
        return { data: null, message: error };
    }
};

export const getBranchesNames = async () => {
    try {
        const response = await fetch(`${BASE_URL}/branches/names`);
        const data = await handleFetchError(response);
        //
        return data;
    } catch (error) {
        return { data: null, message: error };
    }
};

export const createBranch = async (branchData) => {
    try {
        const response = await fetch(`${BASE_URL}/branches`, {
            method: 'POST', // especifica el método HTTP
            headers: {
                'Content-Type': 'application/json', // especifica el tipo de contenido
            },
            body: JSON.stringify(branchData), // convierte los datos del país a una cadena JSON
        });

        const { status, data, message } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        return { data: null, message: error };
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

        return { data: null, message: error };
    }
};

export const updateBranch = async (branchId, branchData) => {
    try {
        const response = await fetch(`${BASE_URL}/branches/${branchId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(branchData),
        });

        const { data, message, status } = await handleFetchError(response);

        if (status === 'success') {
            return { data, message };
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.log(
            `Error al actualizar Sucursal ${branchId} en la API: `,
            error,
        );

        return { data: null, message: error };
    }
};
