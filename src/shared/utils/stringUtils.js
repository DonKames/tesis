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
