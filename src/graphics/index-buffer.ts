import Device from "./device";
import Buffer from "./buffer";

export default class IndexBuffer extends Buffer {
    public type: number;
    public itemSize: number;
    public _glBufferId: WebGLBuffer;

    private device: Device;

    constructor(
        device: Device,
        data: ArrayBuffer,
        itemSize: number,
        type?: number
    ) {
        super(data);

        this.device = device;
        this.type = type !== undefined ? type : Buffer.getBufferType(data);
        this.itemSize = itemSize;
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
