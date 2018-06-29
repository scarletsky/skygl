interface DeviceOptions extends WebGLContextAttributes {
    webgl2: true
}

export default class Device {
    public canvas: HTMLCanvasElement;
    public gl: WebGLRenderingContext;

    constructor(canvas: HTMLCanvasElement, options: DeviceOptions = {}) {
        this.canvas = canvas;
    }
}
