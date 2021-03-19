import { Nullable } from 'types';
import { BaseObject } from 'core/BaseObject';
import { VertexBuffer, VertexBufferGroup } from 'graphics/buffer/VertexBuffer';
import { VertexAttributeSemantic } from 'graphics/buffer/VertexAttribute';
import { IndexBuffer, IndexBufferOptions } from 'graphics/buffer/IndexBuffer';
import { Primitive, PrimitiveOptions } from 'graphics/Primitive';

export interface GeometryOptions {
    vertices?: VertexBufferGroup;
    indices?: IndexBufferOptions;
    primitive?: PrimitiveOptions;
}

export class Geometry extends BaseObject {
    public vertices: VertexBufferGroup;
    public indices: Nullable<IndexBuffer>;
    public primitive: Nullable<Primitive>;

    constructor(options: GeometryOptions = {}) {
        super();
        this.vertices = {};
        this.indices = null;
        this.primitive = null;

        if (options.vertices) {
            for (const semantic in options.vertices) {
                const vertexBuffer = options.vertices[semantic as VertexAttributeSemantic];

                if (vertexBuffer) {
                    this.addVertices(vertexBuffer);
                }
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
        const semantic = vertexBuffer.attribute.semantic;

        if (this.vertices[semantic]) {
            console.error(`[Geometry] vertices existed.`);
            return this;
        }

        this.vertices[semantic] = vertexBuffer;

        return this;
    }

    removeVertices(vertexBuffer: VertexBuffer) {
        const semantic = vertexBuffer.attribute.semantic;

        if (!this.vertices[semantic]) {
            console.error('[Geometry] vertices do not exist.');
        } else {
            delete this.vertices[semantic];
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
