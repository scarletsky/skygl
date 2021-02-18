import { Nullable } from 'types';
import { BaseObject } from 'core/BaseObject';
import { VertexBuffer } from 'graphics/buffer/VertexBuffer';
import { IndexBuffer, IndexBufferOptions } from 'graphics/buffer/IndexBuffer';
import { Primitive, PrimitiveOptions } from 'graphics/Primitive';

export interface GeometryOptions {
    vertices?: VertexBuffer[];
    indices?: IndexBufferOptions;
    primitive?: PrimitiveOptions;
}

export class Geometry extends BaseObject {
    public vertices: VertexBuffer[];
    public indices: Nullable<IndexBuffer>;
    public primitive: Nullable<Primitive>;

    constructor(options: GeometryOptions = {}) {
        super();
        this.vertices = [];
        this.indices = null;
        this.primitive = null;

        if (options.vertices) {
            for (const semantic in options.vertices) {
                const vertexBuffer = options.vertices[semantic];
                this.addVertices(vertexBuffer);
            }
        }

        if (options.indices) {
            this.addIndices(new IndexBuffer(options.indices));
        }

        if (options.primitive) {
            this.addPrimitive(new Primitive(options.primitive));
        }
    }

    addVertices(vertexBuffer: VertexBuffer) {
        if (this.vertices.indexOf(vertexBuffer) > -1) {
            console.error(`[Geometry] vertices existed.`);
            return this;
        }

        this.vertices.push(vertexBuffer);

        return this;
    }

    removeVertices(vertexBuffer: VertexBuffer) {
        const index = this.vertices.indexOf(vertexBuffer);

        if (index === -1) {
            console.error('[Geometry] vertices do not exist.');
        } else {
            this.vertices.splice(index, 1);
        }

        return this;
    }

    addIndices(indexBuffer: IndexBuffer) {
        if (this.indices) {
            console.error('[Geometry] indices existed.');
            return this;
        }

        this.indices = indexBuffer;

        return this;
    }

    removeIndices() {
        this.indices = null;

        return this;
    }

    addPrimitive(primitive: Primitive) {
        if (this.primitive) {
            console.error('[Geometry] primitive existed.');
            return this;
        }

        this.primitive = primitive;

        return this;
    }

    removePrimitive() {
        this.primitive = null;

        return this;
    }

    toJSON() {

    }
}
