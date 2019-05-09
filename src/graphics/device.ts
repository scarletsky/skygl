import ProgramLib from "./program-lib/program-lib";
import ScopeSpace from "./scope-space";
import Shader from "./shader";
import Buffer from "./buffer";
import Texture from "./texture";
import RenderTarget from "./render-target";
import Geometry from "geometries/geometry";
import Material from "materials/material";
import Mesh from "scene/mesh";
import { IResize } from "interfaces";

interface DeviceOptions extends WebGLContextAttributes {
    preferWebgl2?: true;
}

interface TextureUnits {
    [target: number]: Texture;
}

export default class Device implements IResize {
    public width = 0;
    public height = 0;
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

    public textureUnit: number;
    public textureUnits: TextureUnits[];

    public maxTextureSize: number;
    public maxCombinedTextureUnits: number;
    public maxPixelRatio = window.devicePixelRatio;

    private shader: Shader;
    private renderTarget: RenderTarget;
    private vertexBuffer: WebGLBuffer;
    private indexBuffer: WebGLBuffer;
    private enabledAttributes: Uint8Array;

    constructor(canvas: HTMLCanvasElement, options: DeviceOptions = {}) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
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

        this.shader = null;
        this.vertexBuffer = null;
        this.indexBuffer = null;
        this.textureUnit = 0;
        this.textureUnits = [];
        this.enabledAttributes = new Uint8Array(maxVertexAttributes);
    }

    private initializeCapabilities() {
        const gl = this.gl;

        this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.maxCombinedTextureUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);

        for (let i = 0; i < this.maxCombinedTextureUnits; i++) {
            this.textureUnits.push({});
        }
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

    public resize(width: number, height: number) {
        if (this.width === width && this.height === height) return;

        this.width = width;
        this.height = height;

        this.canvas.width = width * this.maxPixelRatio;
        this.canvas.height = height * this.maxPixelRatio;
    }

    public setMaxPixelRatio(value: number) {
        if (value > window.devicePixelRatio) {
            console.error('[Device] maxPixelRatio can not bigger than window.devicePixelRatio.');
            return;
        };
        if (this.maxPixelRatio === value) return;

        this.maxPixelRatio = value;
        this.resize(this.width, this.height);
    }

    public setShader(shader: Shader) {
        if (this.shader !== shader) {
            this.shader = shader;

            if (!shader.ready && !shader.apply(this)) {
                throw new Error("Can not link shader.");
            }
            this.gl.useProgram(shader.program);
        }
    }

    public setAttributes(geometry: Geometry) {
        let bufferId, location, vertexBuffer;
        const gl = this.gl;
        const attributes = this.shader.attributes;
        const vertexBuffers = geometry.attributes;

        // bind vertex buffers
        for (const attribute of attributes) {
            location = attribute.location as number;
            vertexBuffer = vertexBuffers[attribute.name];

            if (vertexBuffer._needsUpload) vertexBuffer.apply(this);

            bufferId = vertexBuffer._glBufferId;

            if (this.vertexBuffer !== bufferId) {
                this.vertexBuffer = bufferId;
                gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
            }
            if (!this.enabledAttributes[location]) {
                this.enabledAttributes[location] = 1;
                gl.enableVertexAttribArray(location);
            }
            gl.vertexAttribPointer(
                location,
                vertexBuffer.itemSize,
                vertexBuffer.type,
                vertexBuffer.normalized,
                vertexBuffer.stride,
                vertexBuffer.offset
            );
        }
    }

    public setUniforms() {
        const gl = this.gl;
        const scope = this.scope;
        const uniforms = this.shader.uniforms;
        // set uniform
        for (const uniform of uniforms) {
            uniform.setValue(gl, scope.variables[uniform.name]);
        }
    }

    public setSamplers() {
        const gl = this.gl;
        const scope = this.scope;
        const samplers = this.shader.samplers;

        let textureUnit = 0;

        for (const sampler of samplers) {

            const texture = scope.variables[sampler.name] as Texture;
            if (!texture) continue;

            if (this.textureUnit !== textureUnit) {
                this.textureUnit = textureUnit;
            }

            texture.apply(this, textureUnit);
            sampler.setValue(gl, textureUnit);

            textureUnit++;
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

    public setColorWrite(redWrite: boolean, greenWrite: boolean, blueWrite: boolean, alphaWrite: boolean) {
        this.gl.colorMask(redWrite, greenWrite, blueWrite, alphaWrite);
    }

    public setDepthWrite(depthWrite: boolean) {
        this.gl.depthMask(depthWrite);
    }

    public setViewport(x: number, y: number, width: number, height: number) {
        this.gl.viewport(x, y, width, height);
    }

    public setRenderTarget(renderTarget: RenderTarget) {
        if (this.renderTarget !== renderTarget) {
            this.renderTarget = renderTarget;

            if (this.renderTarget) {
                this.renderTarget.apply(this);
            } else {
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)
            }
        }
    }

    public deleteBuffer(buffer: Buffer) {
        const gl = this.gl;
        if (buffer._glBufferId) {
            gl.deleteBuffer(buffer._glBufferId);
            buffer._glBufferId = null;
        }
    }

    public deleteTexture(texture: Texture) {
        const gl = this.gl;
        if (texture._glTextureId) {
            gl.deleteTexture(texture._glTextureId);
            texture._glTextureId = null;
        }
    }

    public clear(colorBuffer = true, depthBuffer = true, stencilBuffer = true) {
        const gl = this.gl;
        const colorMask = colorBuffer ? gl.COLOR_BUFFER_BIT : 0;
        const depthMask = depthBuffer ? gl.DEPTH_BUFFER_BIT : 0;
        const stencilMask = stencilBuffer ? gl.STENCIL_BUFFER_BIT : 0;
        const mask = colorMask | depthMask | stencilMask;
        gl.clear(mask);
    }

    public draw(mesh: Mesh) {
        const gl = this.gl;
        const geometry = mesh.geometry;
        const primitive = geometry.primitive;
        const indexBuffer = primitive.indexBuffer;

        this.setAttributes(geometry);
        this.setSamplers();
        this.setUniforms();

        // set index buffer
        if (this.indexBuffer !== indexBuffer) {
            this.indexBuffer = indexBuffer;
            if (indexBuffer) {
                if (indexBuffer._needsUpload) indexBuffer.apply(this);
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
