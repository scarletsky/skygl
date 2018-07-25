import Device from "./device";
import ShaderInput from "./shader-input";

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
    public attributes: ShaderInput[] = [];
    public uniforms: ShaderInput[] = [];
    public samplers: ShaderInput[] = [];
    public program: WebGLProgram;

    private device: Device;
    private definition: ShaderDefinition;
    private vshader: WebGLShader;
    private fshader: WebGLShader;

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

        if (!gl.getShaderParameter(this.vshader, gl.COMPILE_STATUS)) {
            console.error("Failed to compile vertex shader:\n\n", gl.getShaderInfoLog(this.vshader));
            return false;
        }

        if (!gl.getShaderParameter(this.fshader, gl.COMPILE_STATUS)) {
            console.error("Failed to compile fragment shader:\n\n", gl.getShaderInfoLog(this.fshader));
            return false;
        }

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error("Failed to link shader program:\n\n", gl.getProgramInfoLog(this.program));
            return false;
        }

        gl.deleteShader(this.vshader);
        gl.deleteShader(this.fshader);

        let info: WebGLActiveInfo;
        let location: number | WebGLUniformLocation;
        let i = 0;
        const numAttributes = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        while (i < numAttributes) {
            info = gl.getActiveAttrib(this.program, i++);
            location = gl.getAttribLocation(this.program, info.name);
            this.attributes.push(
                new ShaderInput(
                    this.device,
                    info.name,
                    info.type,
                    location
                )
            );
        }

        i = 0;
        const numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        while (i < numUniforms) {
            info = gl.getActiveUniform(this.program, i++);
            location = gl.getUniformLocation(this.program, info.name);
            // TODO support webgl2: gl.SAMPLER_2D_SHADOE, gl.SAMPLER_CUBE_SHADOW, gl.SAMPLER_3D
            if (info.type === gl.SAMPLER_2D || info.type === gl.SAMPLER_CUBE) {
                this.samplers.push(new ShaderInput(this.device, info.name, info.type, location));
            } else {
                this.uniforms.push(new ShaderInput(this.device, info.name, info.type, location));
            }
        }

        this.ready = true;

        return true;
    }

    public destroy() {
        if (this.program) {
            const gl = this.device.gl;
            gl.deleteProgram(this.program);
            this.program = null;
        }
    }
}
