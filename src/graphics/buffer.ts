export type TypedArray = Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;

export default class Buffer {
    public static readonly BYTE = 5120;
    public static readonly UNSIGNED_BYTE = 5121;
    public static readonly SHORT = 5122;
    public static readonly UNSIGNED_SHORT = 5123;
    public static readonly INT = 5124;
    public static readonly UNSIGNED_INT = 5125;
    public static readonly FLOAT = 5126;

    public static readonly ELEMENT_ARRAY_BUFFER = 0x8893;
    public static readonly ARRAY_BUFFER = 0x8892;

    public static getBufferType(data: TypedArray) {
        let type = Buffer.FLOAT;

        if (data instanceof Float32Array) type = Buffer.FLOAT;
        if (data instanceof Int16Array) type = Buffer.SHORT;
        if (data instanceof Uint16Array) type = Buffer.UNSIGNED_SHORT;
        if (data instanceof Int8Array) type = Buffer.BYTE;
        if (data instanceof Uint8Array) type = Buffer.UNSIGNED_BYTE;
        if (data instanceof Uint8ClampedArray) type = Buffer.UNSIGNED_BYTE;
        if (data instanceof Int32Array) type = Buffer.INT;
        if (data instanceof Uint32Array) type = Buffer.UNSIGNED_INT;

        return type;
    }

    public target: number;
    public data: TypedArray;
    public _needsUpload: boolean;
    public _glBufferId: WebGLBuffer;

    constructor(target: number, data: TypedArray) {
        this.target = target;
        this.data = data;
    }
}
