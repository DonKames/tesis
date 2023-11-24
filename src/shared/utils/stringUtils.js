export function capitalizeFirstLetter(string) {
    if (typeof string !== 'string') return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function toLowerCase(string) {
    if (typeof string !== 'string') return string;
    return string.toLowerCase();
}

export function toUpperCase(string) {
    if (typeof string !== 'string') return string;
    return string.toUpperCase();
}

export function timestampDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() devuelve un índice basado en cero, por lo que se suma 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function timestampTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}
