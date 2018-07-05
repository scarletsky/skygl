import IndexBuffer from "./index-buffer";

export default class Primitive {
    public static readonly POINTS = 0;
    public static readonly LINES = 1;
    public static readonly LINE_LOOP = 2;
    public static readonly LINE_STRIP = 3;
    public static readonly TRIANGLES = 4;
    public static readonly TRIANGLE_STRIP = 5;
    public static readonly TRIANGLE_FAN = 6;

    public mode: number;
    public indexBuffer: IndexBuffer = null;
    public first: number = 0;
    public count: number = 0;
    public offset: number = 0;

    constructor(mode: number, indexBuffer: IndexBuffer = null) {
        this.mode = mode;

        if (indexBuffer) this.setIndexBuffer(indexBuffer);
    }

    public setIndexBuffer(indexBuffer: IndexBuffer) {
        this.indexBuffer = indexBuffer;
        this.count = indexBuffer.itemSize;
    }
}
