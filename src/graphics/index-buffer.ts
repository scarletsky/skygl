import Buffer, { TypedArray } from "./buffer";

export default class IndexBuffer extends Buffer {
    public type: number;
    public itemSize: number;
    public _glBufferId: WebGLBuffer;

    constructor(
        data: TypedArray,
        itemSize?: number,
        type?: number
    ) {
        super(data);
        this.target = Buffer.ELEMENT_ARRAY_BUFFER;
        this.itemSize = itemSize !== undefined ? itemSize : data.length;
        this.type = type !== undefined ? type : Buffer.getBufferType(data);
        this._needsUpload = true;
    }
}
