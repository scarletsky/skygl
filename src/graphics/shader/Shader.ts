import { Nullable } from 'types';
import { BaseObject } from 'core/BaseObject';
import { Device } from '../Device';
import { ShaderInput } from './ShaderInput';
import { UniformInput } from './UniformInput';

export interface ShaderSourceDefines {
    [name: string]: string;
}

export interface ShaderOptions {
    precision?: string;
    vertexDefines?: ShaderSourceDefines;
    fragmentDefines?: ShaderSourceDefines;
    vertexSource: string;
    fragmentSource: string;
}

export class Shader extends BaseObject {
    public precision: string;
    public vertexDefines: ShaderSourceDefines;
    public vertexSource: string;
    public fragmentDefines: ShaderSourceDefines;
    public fragmentSource: string;
    public attributes: { [semantic: string]: ShaderInput };
    public uniforms: { [name: string]: UniformInput };
    public _glProgramId: Nullable<WebGLProgram>;
    public _inited: boolean;
    public _destroying: boolean;
    public _destroyed: boolean;

    constructor(options: ShaderOptions) {
        super();
        this.precision = options.precision || 'highp';
        this.vertexSource = options.vertexSource || '';
        this.fragmentSource = options.fragmentSource || '';
        this.vertexDefines = options.vertexDefines || {};
        this.fragmentDefines = options.fragmentDefines || {};
        this.attributes = {};
        this.uniforms = {};
        this._glProgramId = null;
        this._inited = false;
        this._destroying = false;
        this._destroyed = false;
    }


    destroy() {
        this._destroying = true;
    }

    onGLCreate(device: Device) {
        if (this._inited) return true;

        const gl = device.gl as WebGLRenderingContext;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        const program = gl.createProgram();
        let info;

        if (!vertexShader) {
            console.error('[Shader] can not create vertex shader.');
            return false;
        }

        if (!fragmentShader) {
            console.error('[Shader] can not create fragment shader.');
            return false;
        }

        if (!program) {
            console.error('[Shader] can not create program.');
            return false;
        }

        const vertexSource = this.vertexSource;
        gl.shaderSource(vertexShader, vertexSource);
        gl.compileShader(vertexShader);

        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            info = gl.getShaderInfoLog(vertexShader);
            throw new Error("Could not compile vertex shader. \n\n" + info);
        }

        const fragmentSource = this.fragmentSource;
        gl.shaderSource(fragmentShader, fragmentSource);
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            info = gl.getShaderInfoLog(fragmentShader);
            throw new Error("Could not compile fragment shader. \n\n" + info);
        }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            info = gl.getProgramInfoLog(program);
            throw new Error('Could not compile WebGL program. \n\n' + info);
        }

        const numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < numAttributes; ++i) {
            let info = gl.getActiveAttrib(program, i);

            if (info) {
                const shaderInput = new ShaderInput({
                    name: info.name,
                    type: info.type,
                    location: gl.getAttribLocation(program, info.name)
                });
                this.attributes[info.name] = shaderInput;
            }
        }

        const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < numUniforms; ++i) {
            let info = gl.getActiveUniform(program, i);

            if (info) {
                const uniformInput = new UniformInput({
                    name: info.name,
                    type: info.type,
                    location: gl.getUniformLocation(program, info.name) as WebGLUniformLocation
                });

                this.uniforms[uniformInput.name] = uniformInput;
            }
        }

        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        this._glProgramId = program;
        this._inited = true;

        return true;
    }

    onGLBind(device: Device) {
        const gl = device.gl as WebGLRenderingContext;
        gl.useProgram(this._glProgramId);
    }

    onGLUnbind(device: Device) {
        const gl = device.gl as WebGLRenderingContext;
        gl.useProgram(null);
    }

    onGLDelete(device: Device) {
        const gl = device.gl as WebGLRenderingContext;

        if (this._glProgramId) {
            gl.deleteProgram(this._glProgramId);
            this._destroyed = true;
            this._destroying = false;
        }
    }
}
