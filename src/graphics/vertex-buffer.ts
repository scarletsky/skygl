import Device from "./device";
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

    public static readonly ATTRIBUTE_SIZE_MAP = {
        [VertexBuffer.ATTRIBUTE_POSITION]: 3,
        [VertexBuffer.ATTRIBUTE_NORMAL]: 3,
        [VertexBuffer.ATTRIBUTE_COLOR]: 4,
        [VertexBuffer.ATTRIBUTE_TANGENT]: 4,
        [VertexBuffer.ATTRIBUTE_TEXCOORD_0]: 2
    } as { [attribute: string]: number };

    public stride: number;
    public offset: number;
    public type: number;
    public normalized: boolean;
    public interleaved: boolean;
    public data: ArrayBuffer;

    public _glBufferId: WebGLBuffer;
    public _needsUpload = true;

    private device: Device;

    constructor(
        device: Device,
        data: ArrayBuffer,
        type: number,
        stride: number = 0,
        offset: number = 0,
        normalized: boolean = false,
        interleaved: boolean = false
    ) {
        super(data);
        this.device = device;
        this.type = type;
        this.stride = stride;
        this.offset = offset;
        this.normalized = normalized;
        this.interleaved = interleaved;

        this.upload();
    }

    // TODO support gl.bufferData usage
    public upload() {
        const gl = this.device.gl;
        if (!this._glBufferId) {
            this._glBufferId = gl.createBuffer();
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this._glBufferId);
        gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);

        this._needsUpload = false;
    }

    public destroy() {
        const gl = this.device.gl;
        if (this._glBufferId) {
            gl.deleteBuffer(this._glBufferId);
            this._glBufferId = null;
        }
    }
}
