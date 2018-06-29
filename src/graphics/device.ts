import ScopeSpace from "./scope-space";

interface DeviceOptions extends WebGLContextAttributes {
    preferWebgl2?: true
}

export default class Device {
    public canvas: HTMLCanvasElement;
    public gl: WebGLRenderingContext;
    public webgl2: boolean;
    public scope: ScopeSpace;

    constructor(canvas: HTMLCanvasElement, options: DeviceOptions = {}) {
        this.canvas = canvas;
        this.scope = new ScopeSpace();
        this.initializeContext(options);
        this.initializeExtensions();
        this.initializeCapabilities();
        this.initializeRenderState();
    }

    private initializeContext(options: DeviceOptions) {
        let gl = null;
        const preferWebgl2 = options.preferWebgl2 !== undefined ? options.preferWebgl2 : true;
        const names = preferWebgl2 ? ["webgl2", "webgl"] : ["webgl"];

        for (const name of names) {
            try {
                gl = this.canvas.getContext(name, options) as WebGLRenderingContext;
            } catch (err) {}

            if (gl)  {
                this.gl = gl;
                this.webgl2 = name === "webgl2";
                break;
            }
        }

        if (!gl) throw new Error("Browser do not support WebGL.");
    }

    private initializeExtensions() {

    }

    private initializeCapabilities() {

    }

    private initializeRenderState() {

    }
}
