export const handleFetchError = async (response) => {
    if (!response.ok) {
        const data = await response.json();
        const error = new Error(`HTTP error! status: ${response.status}`);
        error.details = data;
        throw error;
    }
    return response.json();
};
