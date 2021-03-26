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

export function isFunction(value: any): value is (...rest: any[]) => any {
    return typeof value === 'function';
}
