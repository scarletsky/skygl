import Device from "./device";

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    return program;
}

interface ShaderAttributes {
    [attribute: string]: string;
}

interface ShaderDefinition {
    attributes: ShaderAttributes;
    vshader: string;
    fshader: string;
}

export default class Shader {
    public ready = false;

    private device: Device;
    private definition: ShaderDefinition;
    private vshader: WebGLShader;
    private fshader: WebGLShader;
    private program: WebGLProgram;

    constructor(device: Device, definition: ShaderDefinition) {
        this.device = device;
        this.definition = definition;
        this.compile();
    }

    public compile() {
        const gl = this.device.gl;
        this.vshader = createShader(gl, gl.VERTEX_SHADER, this.definition.vshader);
        this.fshader = createShader(gl, gl.FRAGMENT_SHADER, this.definition.fshader);
        this.program = createProgram(gl, this.vshader, this.fshader);
    }

    public link() {
        const gl = this.device.gl;
        gl.linkProgram(this.program);
        gl.deleteShader(this.vshader);
        gl.deleteShader(this.fshader);
        this.ready = true;
    }

    public destroy() {
        if (this.program) {
            const gl = this.device.gl;
            gl.deleteProgram(this.program);
            this.program = null;
        }
    }
}
