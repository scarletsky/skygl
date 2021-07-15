import { Dictionary, Nullable } from 'types';
import { VertexBufferGroup, IndexBuffer } from './buffers';
import { Primitive } from './Primitive';
import { Shader, ShaderRegistry, UniformScope } from './shaders';
import { Drawable } from './Drawable';
import { COLOR_BUFFER_BIT, DEPTH_BUFFER_BIT, LESS, MAX_CUBE_MAP_TEXTURE_SIZE, MAX_TEXTURE_SIZE, SAMPLER_2D, SAMPLER_CUBE, STENCIL_BUFFER_BIT, TEXTURE0, TEXTURE_2D, TEXTURE_CUBE_MAP } from './constants';
import { Texture } from './textures';
import { isNil } from 'utils';
import { TextureRegistry } from './textures/TextureRegistry';

export interface DeviceOptions extends WebGLContextAttributes {
    preferredWebGL2: boolean;
}

export interface ClearOptions {
    color: boolean;
    depth: boolean;
    stencil: boolean;
}

export type DeviceCapabilities = Dictionary<any>;

export type DeviceExtensions = Dictionary<any>;

export type TextureUnit = {
    [TEXTURE_2D]: Nullable<Texture>,
    [TEXTURE_CUBE_MAP]: Nullable<Texture>
}

export class Device {
    public canvas: HTMLCanvasElement;
    public gl: Nullable<WebGLRenderingContext | WebGL2RenderingContext>;;
    public vertices: Nullable<VertexBufferGroup>;
    public indices: Nullable<IndexBuffer>;
    public shader: Nullable<Shader>;
    public shaders: ShaderRegistry;
    public uniforms: UniformScope;
    public activeTexture: number;
    public textureUnits: TextureUnit[];
    public textures: TextureRegistry;
    public capabilities: DeviceCapabilities;
    public extensions: DeviceExtensions;
    public depthTest: boolean;
    public depthWrite: boolean;
    public depthFunc: number;
    public clearOptions: ClearOptions;

    constructor(options: Partial<DeviceOptions> = {}) {
        this.gl = null;
        this.vertices = null;
        this.indices = null;
        this.shader = null;
        this.shaders = new ShaderRegistry();
        this.uniforms = new UniformScope();
        this.textures = new TextureRegistry();
        this.activeTexture = 0;
        this.textureUnits = [];
        this.capabilities = {};
        this.extensions = {};
        this.depthTest = false;
        this.depthWrite = false;
        this.depthFunc = LESS
        this.clearOptions = { color: true, depth: true, stencil: false };
        this.canvas = document.createElement('canvas');
        this.setCanvasSize(window.innerWidth, window.innerHeight);
        this.initContext(options);
        this.initCapabilities();
        this.initExtensions();
    }

    private initContext(options: Partial<DeviceOptions>) {
        this.gl = this.canvas.getContext('webgl', options);

        if (!this.gl) {
            throw new Error('[Device] WebGL not supported');
        }

    }

    private initCapabilities() {
        const gl = this.gl as WebGLRenderingContext;
        const { capabilities } = this;

        capabilities.MAX_TEXTURE_SIZE = gl.getParameter(MAX_TEXTURE_SIZE);
        capabilities.MAX_CUBE_MAP_TEXTURE_SIZE = gl.getParameter(MAX_CUBE_MAP_TEXTURE_SIZE);
    }

    private initExtensions() {

    }

    setCanvasSize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    setShader(shader: Shader | null) {
        if (this.shader === shader) return;

        if (shader) {
            if (!shader._inited) shader.onGLCreate(this);
            shader.onGLBind(this);
        } else {
            if (this.shader) this.shader.onGLUnbind(this);
        }

        this.shader = shader;
    }

    setVertices(vertices: VertexBufferGroup | null) {
        if (this.vertices === vertices) return false;

        if (vertices) {
            vertices.onGLBind(this);
        } else {
            if (this.vertices) this.vertices.onGLUnbind(this);
        }

        this.vertices = vertices;

        return true;
    }

    setIndices(indices: IndexBuffer | null) {
        if (this.indices === indices) return false;

        if (indices) {
            indices.onGLBind(this);
        } else {
            if (this.indices) this.indices.onGLUnbind(this);
        }

        this.indices = indices;

        return true;
    }

    setUniforms(shader: Shader | null) {
        if (!shader) return false;

        // NOTE: reset activeTexture
        this.activeTexture = 0;
        const shaderUniforms = shader.uniforms.values;

        for (const uniformName in shaderUniforms) {
            const uniformInput = shader.uniforms.resolve(uniformName);
            uniformInput.onGLBind(this);
        }

        return true;
    }

    setActiveTexture(value: number) {
        if (this.activeTexture === value) return false;
        if (isNil(this.textureUnits[value])) {
            this.textureUnits[value] = {
                [TEXTURE_2D]: null,
                [TEXTURE_CUBE_MAP]: null
            };
        }

        const gl = this.gl as WebGLRenderingContext;
        gl.activeTexture(TEXTURE0 + value);
        this.activeTexture = value;

        return true;
    }

    // NOTE: Call by UniformInput#onGLBind
    setTexture(texture: Texture | null) {
        if (texture) {
            texture.onGLBind(this);
        }
    }

    setDepthWrite(value: boolean) {
        if (this.depthWrite === value) return false;

        const gl = this.gl as WebGLRenderingContext;
        gl.depthMask(value);
        this.depthWrite = value;

        return true;
    }

    setDepthTest(value: boolean) {
        if (this.depthTest === value) return false;

        const gl = this.gl as WebGLRenderingContext;

        if (value) {
            gl.enable(gl.DEPTH_TEST);
        } else {
            gl.disable(gl.DEPTH_TEST);
        }
        this.depthTest = value;

        return true;
    }

    setDepthFunc(value: number) {
        if (this.depthFunc === value) return false;

        const gl = this.gl as WebGLRenderingContext;
        gl.depthFunc(value);
        this.depthFunc = value;

        return true;
    }

    draw(drawable: Drawable) {
        this.setShader(drawable.shader);

        if (drawable.material) {
            drawable.material.onGLBind(this);
        }

        this.setUniforms(drawable.shader);
        this.setVertices(drawable.vertices);

        if (drawable.indices) {
            this.setIndices(drawable.indices);
            this.drawElements(drawable.primitive);
        } else {
            this.drawArrays(drawable.primitive);
        }
    }

    drawArrays(primitive: Primitive) {
        const gl = this.gl as WebGLRenderingContext;
        gl.drawArrays(primitive.mode, primitive.first, primitive.count);
    }

    drawElements(primitive: Primitive) {
        const gl = this.gl as WebGLRenderingContext;
        gl.drawElements(primitive.mode, primitive.count, primitive.type, primitive.offset);
    }

    clear(options?: Partial<ClearOptions>) {
        const gl = this.gl as WebGLRenderingContext;

        let bit = 0;

        if (!options) {
            options = this.clearOptions;
        }

        if (options.color) {
            bit |= COLOR_BUFFER_BIT;
        }

        if (options.depth) {
            bit |= DEPTH_BUFFER_BIT;
        }

        if (options.stencil) {
            bit |= STENCIL_BUFFER_BIT;
        }

        gl.clear(bit);
    }
}
