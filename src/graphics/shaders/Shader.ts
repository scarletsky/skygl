import { Dictionary, Nullable } from 'types';
import { BaseObject } from 'core/BaseObject';
import { Device } from '../Device';
import { AttributeInput } from './AttributeInput';
import { UniformScope } from './UniformScope';
import { ShaderChunks } from './ShaderChunks';
import { addLineNumber, parseFragmentShader, parseVertexShader } from './utils';

export type ShaderSourceDefine = Dictionary<string | boolean | number>;

export type ShaderSourcePrecision = 'highp' | 'mediump' | 'lowp';

export interface ShaderOptions {
    precision?: ShaderSourcePrecision;
    vertexDefine?: ShaderSourceDefine;
    fragmentDefine?: ShaderSourceDefine;
    vertexSource: string;
    fragmentSource: string;
}

export class Shader extends BaseObject {
    public precision: ShaderSourcePrecision;
    public vertexDefine: ShaderSourceDefine;
    public vertexSource: string;
    public fragmentDefine: ShaderSourceDefine;
    public fragmentSource: string;
    public attributes: Dictionary<AttributeInput>
    public uniforms: UniformScope;
    public chunks: Nullable<ShaderChunks>;
    public _glProgramId: Nullable<WebGLProgram>;
    public _inited: boolean;
    public _failed: boolean;
    public _destroying: boolean;
    public _destroyed: boolean;

    constructor(options: ShaderOptions) {
        super();
        this.precision = options.precision || 'highp';
        this.vertexSource = options.vertexSource || '';
        this.fragmentSource = options.fragmentSource || '';
        this.vertexDefine = options.vertexDefine || {};
        this.fragmentDefine = options.fragmentDefine || {};
        this.attributes = {};
        this.uniforms = {};
        this.chunks = null;
        this._glProgramId = null;
        this._inited = false;
        this._failed = false;
        this._destroying = false;
        this._destroyed = false;
    }

    destroy() {
        this._destroying = true;
    }

    onGLCreate(device: Device) {
        if (this._inited) return true;
        if (this._failed) return false;

        const gl = device.gl as WebGLRenderingContext;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        const program = gl.createProgram();
        let info;

        if (!vertexShader) {
            console.error('[Shader] can not create vertex shader.');
            this._failed = true;
            return false;
        }

        if (!fragmentShader) {
            console.error('[Shader] can not create fragment shader.');
            this._failed = true;
            return false;
        }

        if (!program) {
            console.error('[Shader] can not create program.');
            this._failed = true;
            return false;
        }

        const vertexSource = parseVertexShader(this);
        gl.shaderSource(vertexShader, vertexSource);
        gl.compileShader(vertexShader);

        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            info = gl.getShaderInfoLog(vertexShader);
            this._failed = true;
            console.error(addLineNumber(vertexSource));
            throw new Error("Could not compile vertex shader. \n\n" + info);
        }

        const fragmentSource = parseFragmentShader(this);
        gl.shaderSource(fragmentShader, fragmentSource);
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            info = gl.getShaderInfoLog(fragmentShader);
            this._failed = true;
            console.error(addLineNumber(fragmentSource));
            throw new Error("Could not compile fragment shader. \n\n" + info);
        }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            info = gl.getProgramInfoLog(program);
            this._failed = true;
            throw new Error('Could not compile WebGL program. \n\n' + info);
        }

        const numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < numAttributes; ++i) {
            let info = gl.getActiveAttrib(program, i);

            if (info) {
                const shaderInput = new AttributeInput({
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
        device.shaders.add(this);

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
            device.shaders.remove(this.id);
        }
    }
}
