export function isNil(value: any) {
    if (value === null || value === undefined) return true;
    return false;
}

export function isNumber(value: any) {
    return typeof value === 'number';
}

export function isBoolean(value: any) {
    return typeof value === 'boolean';
}
