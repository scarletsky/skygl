import { Nullable } from 'types';
import { VertexBuffer, VertexBufferGroup, VertexAttributeSemantic, IndexBuffer } from './buffers';
import { Primitive } from './Primitive';
import { Shader, UniformScope } from './shaders';
import { Drawable } from './Drawable';
import { COLOR_BUFFER_BIT, DEPTH_BUFFER_BIT, STENCIL_BUFFER_BIT } from './constants';

export interface DeviceOptions extends WebGLContextAttributes {
    preferredWebGL2?: boolean;
}

export interface ClearOptions {
    color?: boolean;
    depth?: boolean;
    stencil?: boolean;
}

export class Device {
    public canvas: HTMLCanvasElement;
    public gl: Nullable<WebGLRenderingContext | WebGL2RenderingContext>;;
    public uniforms: Nullable<UniformScope>;
    public shader: Nullable<Shader>;
    public clearOptions: ClearOptions;

    constructor(canvas: HTMLCanvasElement, options: DeviceOptions = {}) {
        this.gl = null;
        this.uniforms = null;
        this.shader = null;
        this.canvas = canvas;
        this.clearOptions = { color: true, depth: true };
        this.initContext(options);
        this.initCapabilities();
        this.initExtensions();
    }

    private initContext(options: DeviceOptions) {
        this.gl = this.canvas.getContext('webgl', options);

        if (!this.gl) {
            throw new Error('[Device] WebGL not supported');
        }

        this.uniforms = new UniformScope();
    }

    private initCapabilities() {

    }

    private initExtensions() {

    }

    setShader(shader: Shader) {
        if (this.shader === shader) return;

        if (!shader._inited) {
            shader.onGLCreate(this);
        }

        shader.onGLBind(this);
        this.shader = shader;
    }

    setVertices(vertices: VertexBufferGroup) {
        for (let semantic in vertices) {
            const vertexBuffer = vertices[semantic as VertexAttributeSemantic];

            if (vertexBuffer) {
                vertexBuffer.onGLBind(this);
            }
        }
    }

    setIndices(indices: IndexBuffer) {
        indices.onGLBind(this);
    }

    setUniforms() {
        const shader = this.shader as Shader;
        const gl = this.gl as WebGLRenderingContext;
        const deviceUniforms = this.uniforms as UniformScope;
        const shaderUniforms = shader.uniforms;

        for (let uniformName in shaderUniforms) {
            let uniform = shaderUniforms[uniformName];
            let value = deviceUniforms.resolve(uniform.name).getValue();
            uniform.setValue(gl, value);
        }
    }

    draw(drawable: Drawable) {
        this.setShader(drawable.shader);
        this.setVertices(drawable.vertices);
        this.setUniforms();

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

    clear(options?: ClearOptions) {
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
