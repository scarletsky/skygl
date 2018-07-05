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

    public data: ArrayBuffer;

    constructor(data: ArrayBuffer) {
        this.data = data;
    }
}
