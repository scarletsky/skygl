import Device from "./device";

export default class IndexBuffer {
    public data: ArrayBuffer;
    public type: number;
    public offset: number;
    public count: number;
    public _glBufferId: WebGLBuffer;

    private device: Device;

    constructor(
        device: Device,
        data: ArrayBuffer,
        type: number,
        count: number,
        offset: number = 0
    ) {
        this.device = device;
        this.data = data;
        this.type = type;
        this.count = count;
        this.offset = offset;
        this.upload();
    }

    // TODO support gl.bufferData usage
    public upload() {
        const gl = this.device.gl;
        if (!this._glBufferId) {
            this._glBufferId = gl.createBuffer();
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._glBufferId);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.data, gl.STATIC_DRAW);
    }
}
