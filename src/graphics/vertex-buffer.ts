import Buffer from "./buffer";

export default class VertexBuffer extends Buffer {
    public static readonly STATIC_DRAW = 0x88e4;
    public static readonly DYNAMIC_DRAW = 0x88e8;
    public static readonly STREAM_DRAW = 0x88e0;

    public static readonly ATTRIBUTE_POSITION = "POSITION";
    public static readonly ATTRIBUTE_NORMAL = "NORMAL";
    public static readonly ATTRIBUTE_TANGENT = "TANGENT";
    public static readonly ATTRIBUTE_COLOR = "COLOR";
    public static readonly ATTRIBUTE_TEXCOORD_0 = "TEXCOORD_0";

    public itemSize: number;
    public type: number;
    public stride: number;
    public offset: number;
    public normalized: boolean;
    public interleaved: boolean;
    public data: ArrayBuffer;

    constructor(
        target: number,
        data: ArrayBuffer,
        itemSize: number,
        type?: number,
        stride: number = 0,
        offset: number = 0,
        normalized: boolean = false,
        interleaved: boolean = false
    ) {
        super(target, data);
        this.itemSize = itemSize;
        this.type = type !== undefined ? type : Buffer.getBufferType(data);
        this.stride = stride;
        this.offset = offset;
        this.normalized = normalized;
        this.interleaved = interleaved;
        this._needsUpload = true;
    }

    public upload() {
        this._needsUpload = true;
    }
}
