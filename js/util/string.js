export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1); 
}

export function capitalizeAllWords(string, ascii = true) {
    if (ascii == false) {
        return string.replace(/(^|\s)\S/g, l => l.toUpperCase());
    }
    else {
        return string.replace(/\b\w/g, l => l.toUpperCase());
    }
}