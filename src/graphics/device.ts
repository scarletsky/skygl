import ProgramLib from "./program-lib/program-lib";
import ScopeSpace from "./scope-space";
import ShaderInput from "./shader-input";
import Shader from "./shader";
import Buffer from "./buffer";
import Geometry from "../scene/geometry";
import Material from "../scene/material";
import Mesh from "../scene/mesh";

interface DeviceOptions extends WebGLContextAttributes {
    preferWebgl2?: true;
}

interface DeviceCommitFunction {
    [dataType: number]: (uniform: ShaderInput, value: any) => void;
}

export default class Device {
    public canvas: HTMLCanvasElement;
    public gl: WebGLRenderingContext;
    // TODO: rename to webgl, value should be 1 or 2
    public webgl2: boolean;
    public scope: ScopeSpace;
    public programlib: ProgramLib;
    public blending: boolean;
    public redWrite: boolean;
    public greenWrite: boolean;
    public blueWrite: boolean;
    public alphaWrite: boolean;
    public depthTest: boolean;
    public cullFace: number;

    private boundShader: Shader;
    private boundVertexBuffer: WebGLBuffer;
    private boundIndexBuffer: WebGLBuffer;
    private enabledAttributes: Uint8Array;
    // TODO: rename to uniformSetters
    private commitFunction: DeviceCommitFunction = {};

    constructor(canvas: HTMLCanvasElement, options: DeviceOptions = {}) {
        this.canvas = canvas;
        this.scope = new ScopeSpace();
        this.programlib = new ProgramLib(this);
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

        this.commitFunction[gl.FLOAT] = function(uniform, value) {
            if (uniform.value !== value) {
                gl.uniform1f(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.commitFunction[gl.FLOAT_VEC2] = function(uniform, value) {
            const uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1]) {
                gl.uniform2f(uniform.locationId, value[0], value[1]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
            }
        };
        this.commitFunction[gl.FLOAT_VEC3] = function(uniform, value) {
            const uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1] || uniformValue[2] !== value[2]) {
                gl.uniform3f(uniform.locationId, value[0], value[1], value[2]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
                uniformValue[2] = value[2];
            }
        };
        this.commitFunction[gl.FLOAT_VEC4] = function(uniform, value) {
            const uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1] || uniformValue[2] !== value[2] || uniformValue[3] !== value[3]) {
                gl.uniform4f(uniform.locationId, value[0], value[1], value[2], value[3]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
                uniformValue[2] = value[2];
                uniformValue[3] = value[3];
            }
        };
        this.commitFunction[gl.BOOL] = this.commitFunction[gl.INT] = function(uniform, value) {
            if (uniform.value !== value) {
                gl.uniform1i(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.commitFunction[gl.BOOL_VEC2] = this.commitFunction[gl.INT_VEC2] = function(uniform, value) {
            const uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1]) {
                gl.uniform2i(uniform.locationId, value[0], value[1]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
            }
        };
        this.commitFunction[gl.BOOL_VEC3] = this.commitFunction[gl.INT_VEC3] = function(uniform, value) {
            const uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1] || uniformValue[2] !== value[2]) {
                gl.uniform3i(uniform.locationId, value[0], value[1], value[2]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
                uniformValue[2] = value[2];
            }
        };
        this.commitFunction[gl.BOOL_VEC4] = this.commitFunction[gl.INT_VEC4] = function(uniform, value) {
            const uniformValue = uniform.value;
            if (uniformValue[0] !== value[0] || uniformValue[1] !== value[1] || uniformValue[2] !== value[2] || uniformValue[3] !== value[3]) {
                gl.uniform4i(uniform.locationId, value[0], value[1], value[2], value[3]);
                uniformValue[0] = value[0];
                uniformValue[1] = value[1];
                uniformValue[2] = value[2];
                uniformValue[3] = value[3];
            }
        };
        this.commitFunction[gl.FLOAT_MAT2] = function(uniform, value) { gl.uniformMatrix2fv(uniform.locationId, false, value); };
        this.commitFunction[gl.FLOAT_MAT3] = function(uniform, value) { gl.uniformMatrix3fv(uniform.locationId, false, value); };
        this.commitFunction[gl.FLOAT_MAT4] = function(uniform, value) { gl.uniformMatrix4fv(uniform.locationId, false, value); };
    }

    private initializeCapabilities() {

    }

    private initializeExtensions() {

    }

    private initializeRenderState() {
        const gl = this.gl;

        this.blending = false;
        gl.disable(gl.BLEND);

        this.redWrite = true;
        this.greenWrite = true;
        this.blueWrite = true;
        this.alphaWrite = true;
        gl.colorMask(true, true, true, true);

        this.depthTest = true;
        gl.enable(gl.DEPTH_TEST);

        this.cullFace = Material.CULLFACE_BACK;
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
    }

    public setShader(shader: Shader) {
        if (this.boundShader !== shader) {
            this.boundShader = shader;

            if (!shader.ready && !shader.link()) {
                throw new Error("Can not link shader.");
            }
            this.gl.useProgram(shader.program);
        }
    }

    public setAttributes(geometry: Geometry) {
        let bufferId, locationId, scopeId, vertexBuffer;
        const gl = this.gl;
        const attributes = this.boundShader.attributes;
        const vertexBuffers = geometry.attributes;

        // bind vertex buffers
        for (const attribute of attributes) {
            scopeId = attribute.scopeId;
            locationId = attribute.locationId as number;
            vertexBuffer = vertexBuffers[scopeId.name];

            if (vertexBuffer._needsUpload) this.uploadBuffer(vertexBuffer);

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
                vertexBuffer.itemSize,
                vertexBuffer.type,
                vertexBuffer.normalized,
                vertexBuffer.stride,
                vertexBuffer.offset
            );
        }
    }

    public setUniforms() {
        const uniforms = this.boundShader.uniforms;
        // set uniform
        for (const uniform of uniforms) {
            const scopeId = uniform.scopeId;
            if (scopeId.value !== null) {
                this.commitFunction[uniform.dataType](uniform, scopeId.value);
            }
        }
    }

    public setDepthTest(depthTest: boolean) {
        if (this.depthTest !== depthTest) {
            const gl = this.gl;
            if (depthTest) {
                gl.enable(gl.DEPTH_TEST);
            } else {
                gl.disable(gl.DEPTH_TEST);
            }
            this.depthTest = depthTest;
        }
    }

    public setCullFace(cullFace: number) {
        if (this.cullFace !== cullFace) {
            const gl = this.gl;
            if (cullFace === Material.CULLFACE_NONE) {
                gl.disable(gl.CULL_FACE);
            } else {
                if (this.cullFace === Material.CULLFACE_NONE) {
                    gl.enable(gl.CULL_FACE);
                }

                if (cullFace === Material.CULLFACE_BACK) {
                    gl.cullFace(gl.BACK);
                } else if (cullFace === Material.CULLFACE_FRONT)  {
                    gl.cullFace(gl.FRONT);
                } else if (cullFace === Material.CULLFACE_FRONT_AND_BACK) {
                    gl.cullFace(gl.FRONT_AND_BACK);
                }
            }

            this.cullFace = cullFace;
        }
    }

    public uploadBuffer(buffer: Buffer) {
        const gl = this.gl;
        if (!buffer._glBufferId) {
            buffer._glBufferId = gl.createBuffer();
        }

        gl.bindBuffer(buffer.target, buffer._glBufferId);
        gl.bufferData(buffer.target, buffer.data, gl.STATIC_DRAW);

        buffer._needsUpload = false;
    }

    public deleteBuffer(buffer: Buffer) {
        const gl = this.gl;
        if (buffer._glBufferId) {
            gl.deleteBuffer(buffer._glBufferId);
            buffer._glBufferId = null;
        }
    }

    public draw(mesh: Mesh) {
        const gl = this.gl;
        const geometry = mesh.geometry;
        const primitive = geometry.primitive;
        const indexBuffer = primitive.indexBuffer;

        this.setAttributes(geometry);
        this.setUniforms();

        // set index buffer
        if (this.boundIndexBuffer !== indexBuffer) {
            this.boundIndexBuffer = indexBuffer;
            if (indexBuffer) {
                if (indexBuffer._needsUpload) this.uploadBuffer(indexBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer._glBufferId);
            } else {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            }
        }

        if (indexBuffer) {
            gl.drawElements(primitive.mode, primitive.count, indexBuffer.type, primitive.offset);
        } else {
            gl.drawArrays(primitive.mode, primitive.first, primitive.count);
        }
    }
}
