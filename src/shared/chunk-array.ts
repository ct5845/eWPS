export function chunkArray(arr, size) {
    const sets   = [];
    const chunks = arr.length / size;

    for (var i = 0, j = 0; i < chunks; i++, j += size) {
        sets[i] = arr.slice(j, j + size);
    }

    return sets;
}
