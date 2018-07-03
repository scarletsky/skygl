import ScopeSpace from "./scope-space";
import ShaderInput from "./shader-input";
import Shader from "./shader";
import Mesh from "../scene/mesh";
import VertexBuffer from "./vertex-buffer";

interface DeviceOptions extends WebGLContextAttributes {
    preferWebgl2?: true
}

interface DeviceCommitFunction {
    [dataType: number]: (uniform: ShaderInput, value: any) => void;
}

export default class Device {
    public canvas: HTMLCanvasElement;
    public gl: WebGLRenderingContext;
    public webgl2: boolean;
    public scope: ScopeSpace;

    private boundShader: Shader;
    private boundVertexBuffer: WebGLBuffer;
    private boundIndexBuffer: WebGLBuffer;
    private enabledAttributes: Uint8Array;
    private defaultClearOptions: any;
    private glAddress: number[];
    private glBlendEquation: number[];
    private glBlendFunction: number[];
    private glComparison: number[];
    private glStencilOp: number[];
    private glClearFlag: number[];
    private glCull: number[];
    private glFront: number[];
    private glFilter: number[];
    private glType: number[];
    private commitFunction: DeviceCommitFunction = {};

    constructor(canvas: HTMLCanvasElement, options: DeviceOptions = {}) {
        this.canvas = canvas;
        this.scope = new ScopeSpace();
        this.initializeContext(options);
        this.initializeDevice();
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

    private initializeDevice() {
        const gl = this.gl;
        const maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);

        this.boundShader = null;
        this.boundVertexBuffer = null;
        this.boundIndexBuffer = null;
        this.enabledAttributes = new Uint8Array(maxVertexAttributes);

        this.glAddress = [
            gl.REPEAT,
            gl.CLAMP_TO_EDGE,
            gl.MIRRORED_REPEAT
        ];

        this.glBlendEquation = [
            gl.FUNC_ADD,
            gl.FUNC_SUBTRACT,
            gl.FUNC_REVERSE_SUBTRACT,
            // this.webgl2 ? gl.MIN : this.extBlendMinmax ? this.extBlendMinmax.MIN_EXT : gl.FUNC_ADD,
            // this.webgl2 ? gl.MAX : this.extBlendMinmax ? this.extBlendMinmax.MAX_EXT : gl.FUNC_ADD
        ];

        this.glBlendFunction = [
            gl.ZERO,
            gl.ONE,
            gl.SRC_COLOR,
            gl.ONE_MINUS_SRC_COLOR,
            gl.DST_COLOR,
            gl.ONE_MINUS_DST_COLOR,
            gl.SRC_ALPHA,
            gl.SRC_ALPHA_SATURATE,
            gl.ONE_MINUS_SRC_ALPHA,
            gl.DST_ALPHA,
            gl.ONE_MINUS_DST_ALPHA
        ];

        this.glComparison = [
            gl.NEVER,
            gl.LESS,
            gl.EQUAL,
            gl.LEQUAL,
            gl.GREATER,
            gl.NOTEQUAL,
            gl.GEQUAL,
            gl.ALWAYS
        ];

        this.glStencilOp = [
            gl.KEEP,
            gl.ZERO,
            gl.REPLACE,
            gl.INCR,
            gl.INCR_WRAP,
            gl.DECR,
            gl.DECR_WRAP,
            gl.INVERT
        ];

        this.glClearFlag = [
            0,
            gl.COLOR_BUFFER_BIT,
            gl.DEPTH_BUFFER_BIT,
            gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT,
            gl.STENCIL_BUFFER_BIT,
            gl.STENCIL_BUFFER_BIT | gl.COLOR_BUFFER_BIT,
            gl.STENCIL_BUFFER_BIT | gl.DEPTH_BUFFER_BIT,
            gl.STENCIL_BUFFER_BIT | gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT
        ];

        this.glCull = [
            0,
            gl.BACK,
            gl.FRONT,
            gl.FRONT_AND_BACK
        ];

        this.glFront = [
            gl.CCW,
            gl.CW
        ];

        this.glFilter = [
            gl.NEAREST,
            gl.LINEAR,
            gl.NEAREST_MIPMAP_NEAREST,
            gl.NEAREST_MIPMAP_LINEAR,
            gl.LINEAR_MIPMAP_NEAREST,
            gl.LINEAR_MIPMAP_LINEAR
        ];

        this.commitFunction[gl.FLOAT] = function (uniform, value) {
            if (uniform.value !== value) {
                gl.uniform1f(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.commitFunction[gl.FLOAT_VEC2] = function (uniform, value) {
            let uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1]) {
                gl.uniform2f(uniform.locationId, value[0], value[1]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
            }
        };
        this.commitFunction[gl.FLOAT_VEC3] = function (uniform, value) {
            let uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1] || uniformValue[2] !== value[2]) {
                gl.uniform3f(uniform.locationId, value[0], value[1], value[2]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
                uniformValue[2] = value[2];
            }
        };
        this.commitFunction[gl.FLOAT_VEC4] = function (uniform, value) {
            let uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1] || uniformValue[2] !== value[2] || uniformValue[3] !== value[3]) {
                gl.uniform4f(uniform.locationId, value[0], value[1], value[2], value[3]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
                uniformValue[2] = value[2];
                uniformValue[3] = value[3];
            }
        };
        this.commitFunction[gl.BOOL] = this.commitFunction[gl.INT] = function (uniform, value) {
            if (uniform.value !== value) {
                gl.uniform1i(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.commitFunction[gl.BOOL_VEC2] = this.commitFunction[gl.INT_VEC2] = function (uniform, value) {
            let uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1]) {
                gl.uniform2i(uniform.locationId, value[0], value[1]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
            }
        };
        this.commitFunction[gl.BOOL_VEC3] = this.commitFunction[gl.INT_VEC3] = function (uniform, value) {
            let uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1] || uniformValue[2] !== value[2]) {
                gl.uniform3i(uniform.locationId, value[0], value[1], value[2]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
                uniformValue[2] = value[2];
            }
        };
        this.commitFunction[gl.BOOL_VEC4] = this.commitFunction[gl.INT_VEC4] = function (uniform, value) {
            let uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1] || uniformValue[2] !== value[2] || uniformValue[3] !== value[3]) {
                gl.uniform4i(uniform.locationId, value[0], value[1], value[2], value[3]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
                uniformValue[2] = value[2];
                uniformValue[3] = value[3];
            }
        };
        this.commitFunction[gl.FLOAT_MAT2] = function (uniform, value) { gl.uniformMatrix2fv(uniform.locationId, false, value); };
        this.commitFunction[gl.FLOAT_MAT3] = function (uniform, value) { gl.uniformMatrix3fv(uniform.locationId, false, value); };
        this.commitFunction[gl.FLOAT_MAT4] = function (uniform, value) { gl.uniformMatrix4fv(uniform.locationId, false, value); };
    }

    private initializeCapabilities() {

    }

    private initializeExtensions() {

    }

    private initializeRenderState() {

    }

    public setShader(shader: Shader) {
        if (this.boundShader !== shader) {
            this.boundShader = shader;

            if (!shader.ready && !shader.link()) {
                throw new Error('Can not link shader.');
            }
            this.gl.useProgram(shader.program);
        }
    }

    public draw(mesh: Mesh) {
        const gl = this.gl;
        const attributes = this.boundShader.attributes;
        const vertexBuffers = mesh.vertexBuffers;
        const indexBuffer = mesh.indexBuffer;
        let bufferId, locationId, scopeId;
        let vertexBuffer;

        // bind vertex buffers
        for (let attribute of attributes) {
            scopeId = attribute.scopeId;
            locationId = attribute.locationId as number;
            vertexBuffer = vertexBuffers[scopeId.name];
            bufferId = vertexBuffer._glBufferId;
            if (this.boundVertexBuffer !== bufferId) {
                this.boundVertexBuffer = bufferId;
                gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            }
            if (!this.enabledAttributes[locationId]) {
                this.enabledAttributes[locationId] = 1;
                gl.enableVertexAttribArray(locationId);
            }
            gl.vertexAttribPointer(
                locationId,
                VertexBuffer.ATTRIBUTE_SIZE_MAP[scopeId.name],
                vertexBuffer.type,
                vertexBuffer.normalized,
                vertexBuffer.stride,
                vertexBuffer.offset
            );
        }

        // set index buffer
        if (this.boundIndexBuffer !== indexBuffer) {
            this.boundIndexBuffer = indexBuffer;
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer ? indexBuffer._glBufferId : null);
        }

        if (indexBuffer) {
            gl.drawElements(mesh.primitive, indexBuffer.count, indexBuffer.type, indexBuffer.offset);
        } else {
            gl.drawArrays(mesh.primitive, mesh.drawFirst, mesh.drawCount);
        }
    }
}
