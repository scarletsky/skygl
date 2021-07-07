export type Nullable<T> = T | null;
export type TypedArray = Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;
export type Array2<T> = [T, T];
export type Array3<T> = [T, T, T];
export type Array4<T> = [T, T, T, T];
export type Dictionary<T> = { [index: string]: T };
export type EventCallback = (event: string, ...value: any[]) => void;
export type TraverseCallback<T> = (value: T) => void;
