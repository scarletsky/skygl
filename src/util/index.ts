export function isNil(value: any): value is null | undefined {
    if (value === null || value === undefined) return true;
    return false;
}

export function isUndefined(value: any): value is undefined {
    return typeof value === 'undefined';
}

export function isNumber(value: any): value is number {
    return typeof value === 'number';
}

export function isBoolean(value: any): value is boolean {
    return typeof value === 'boolean';
}
