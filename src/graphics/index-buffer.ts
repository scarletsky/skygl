import Buffer from "./buffer";

export default class IndexBuffer extends Buffer {
    public type: number;
    public itemSize: number;
    public _glBufferId: WebGLBuffer;

    constructor(
        target: number,
        data: ArrayBuffer,
        itemSize: number,
        type?: number
    ) {
        super(target, data);
        this.type = type !== undefined ? type : Buffer.getBufferType(data);
        this.itemSize = itemSize;
        this._needsUpload = true;
    }
}
