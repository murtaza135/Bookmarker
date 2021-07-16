export function uniqKeepFirst(data, key) {
    let seen = new Set();
    return data.filter(item => {
        let k = key(item);
        return seen.has(k) ? false : seen.add(k);
    });
}

export function uniqKeepLast(data, key) {
    return [
        ...new Map(
            data.map(x => [key(x), x])
        ).values()
    ];
}