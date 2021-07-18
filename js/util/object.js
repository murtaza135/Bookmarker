export function isObjectEmpty(obj) {
    return Object.keys(obj).every(attr => {
        return obj[attr] == null || obj[attr] === '';
    });
}

export function isObjectPartiallyEmpty(obj) {
    return Object.keys(obj).some(attr => {
        return obj[attr] == null || obj[attr] === '';
    });
}