import Device from "./device";

export default class VertexBuffer {
    public static readonly BYTE = 5120;
    public static readonly UNSIGNED_BYTE = 5121;
    public static readonly SHORT = 5122;
    public static readonly UNSIGNED_SHORT = 5123;
    public static readonly INT = 5124;
    public static readonly UNSIGNED_INT = 5125;
    public static readonly FLOAT = 5126;

    public static readonly ELEMENT_ARRAY_BUFFER = 0x8893;
    public static readonly ARRAY_BUFFER = 0x8892;

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

    public static getBufferType(data: ArrayBuffer) {
        let type = VertexBuffer.FLOAT;

        if (data instanceof Float32Array) type = VertexBuffer.FLOAT;
        if (data instanceof Int16Array) type = VertexBuffer.SHORT;
        if (data instanceof Uint16Array) type = VertexBuffer.UNSIGNED_SHORT;
        if (data instanceof Int8Array) type = VertexBuffer.BYTE;
        if (data instanceof Uint8Array) type = VertexBuffer.UNSIGNED_BYTE;
        if (data instanceof Uint8ClampedArray) type = VertexBuffer.UNSIGNED_BYTE;
        if (data instanceof Int32Array) type = VertexBuffer.INT;
        if (data instanceof Uint32Array) type = VertexBuffer.UNSIGNED_INT;

        return type;
    }

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
        this.device = device;
        this.data = data;
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
