// NOTE: https://stackoverflow.com/a/2117523/2331095
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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

export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isFunction(value: any): value is Function {
    return typeof value === 'function';
}

export function isArray(value: any): value is Array<any> {
    return Array.isArray(value);
}
