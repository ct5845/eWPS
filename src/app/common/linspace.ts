const NUMBER_OF_POINTS = 100;

function* linspaceGenerator(x1: number, x2: number, n: number = 100): IterableIterator<number> {
    if (n === 1) {
        yield x2;
    } else if (n > 0) {
        const diff = (x2 - x1) / (n - 1);
        for (let i = 0; i < n; i++) {
            yield diff * i + x1;
        }
    }
}

export function linspace(x1, x2, n = NUMBER_OF_POINTS) {
    return Array.from(linspaceGenerator(x1, x2, n));
}
