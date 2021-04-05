import { ELEMENT_ARRAY_BUFFER } from 'graphics/constants';
import { Device } from 'graphics/Device';
import { Buffer, BufferOptions } from './Buffer';

export interface IndexBufferOptions {
    buffer?: BufferOptions;
}

export class IndexBuffer {
    public buffer: Buffer;

    constructor(options: IndexBufferOptions = {}) {
        this.buffer = new Buffer(Object.assign({ target: ELEMENT_ARRAY_BUFFER }, options.buffer));
    }

    onGLBind(device: Device) {
        const gl = device.gl as WebGLRenderingContext;

        if (!this.buffer._inited) {
            this.buffer.onGLCreate(device);
        }

        this.buffer.onGLBind(device);
    }

    onGLUnbind(device: Device) {
        this.buffer.onGLUnbind(device);
    }
}
