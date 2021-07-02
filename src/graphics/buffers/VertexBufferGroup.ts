import { VertexBuffer } from './VertexBuffer';
import { VertexAttributeSemantic } from './VertexAttribute';
import { Device } from 'graphics';
import { Nullable } from 'types';

export interface VertexBufferGroupOptions {
    [VertexAttributeSemantic.POSITION]: Nullable<VertexBuffer>;
    [VertexAttributeSemantic.NORMAL]: Nullable<VertexBuffer>;
    [VertexAttributeSemantic.TANGENT]: Nullable<VertexBuffer>;
    [VertexAttributeSemantic.TEXCOORD_0]: Nullable<VertexBuffer>;
    [VertexAttributeSemantic.COLOR_0]: Nullable<VertexBuffer>;
}

export class VertexBufferGroup {
    public [VertexAttributeSemantic.POSITION]: Nullable<VertexBuffer>;
    public [VertexAttributeSemantic.NORMAL]: Nullable<VertexBuffer>;
    public [VertexAttributeSemantic.TANGENT]: Nullable<VertexBuffer>;
    public [VertexAttributeSemantic.TEXCOORD_0]: Nullable<VertexBuffer>;
    public [VertexAttributeSemantic.COLOR_0]: Nullable<VertexBuffer>;

    constructor(options: Partial<VertexBufferGroupOptions> = {}) {
        for (const semantic in options) {
            const vertexBuffer = options[semantic as VertexAttributeSemantic] as VertexBuffer;

            if (vertexBuffer) {
                this.add(vertexBuffer);
            }
        }
    }

    add(vertexBuffer: VertexBuffer) {
        this[vertexBuffer.attribute.semantic] = vertexBuffer;
    }

    remove(semantic: VertexAttributeSemantic) {
        delete this[semantic];
    }

    onGLBind(device: Device) {
        for (let semantic in VertexAttributeSemantic) {
            const vertexBuffer = this[semantic as VertexAttributeSemantic];

            if (vertexBuffer) {
                vertexBuffer.onGLBind(device);
            }
        }
    }

    onGLUnbind(device: Device) {
        for (let semantic in VertexAttributeSemantic) {
            const vertexBuffer = this[semantic as VertexAttributeSemantic];

            if (vertexBuffer) {
                vertexBuffer.onGLUnbind(device);
            }
        }
    }
}
