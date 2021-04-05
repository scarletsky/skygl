import { ARRAY_BUFFER } from 'graphics/constants';
import { Device } from 'graphics/Device';
import { Shader } from 'graphics/shaders/Shader';
import { Buffer, BufferOptions } from './Buffer';
import { VertexAttribute, VertexAttributeOptions, VertexAttributeSemantic } from './VertexAttribute';

export type VertexBufferGroup = { [semantic in VertexAttributeSemantic]?: VertexBuffer };

export interface VertexBufferOptions {
    buffer?: Buffer | BufferOptions;
    attribute?: VertexAttributeOptions;
}

export class VertexBuffer {
    public buffer: Buffer;
    public attribute: VertexAttribute;

    constructor(options: VertexBufferOptions = {}) {

        if (options.buffer instanceof Buffer) {
            this.buffer = options.buffer;
        } else {
            this.buffer = new Buffer(Object.assign({ target: ARRAY_BUFFER }, options.buffer));
        }

        this.attribute = new VertexAttribute(options.attribute);
    }

    onGLBind(device: Device) {
        const gl = device.gl as WebGLRenderingContext
        const shader = device.shader as Shader;
        const attribute = this.attribute;
        const shaderInput = shader.attributes[attribute.semantic];

        // NOTE: if current shader do not have this attribute, skip it.
        if (!shaderInput) {
            return;
        }

        const location = shaderInput.location as number;

        if (!this.buffer._inited) {
            this.buffer.onGLCreate(device);
        }

        this.buffer.onGLBind(device);
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(
            location,
            attribute.size,
            attribute.type,
            attribute.normalized,
            attribute.stride,
            attribute.offset
        );
    }

    onGLUnbind(device: Device) {
        this.buffer.onGLUnbind(device);
    }
}
