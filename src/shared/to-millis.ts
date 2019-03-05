export function toMillis(value: string) {
    // HH:mm:ss.S
    if (!value) {
        return 0;
    }

    const parts = value.split(':');

    const hours   = 60 * 60 * parseInt(parts[0], 10);
    const minutes = 60 * parseInt(parts[1], 10);
    const seconds = parseFloat(parts[2]);

    return (hours + minutes + seconds) * 1000;
}
