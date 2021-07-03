import { Nullable } from 'types';
import { BaseObject } from 'core/BaseObject';
import { Primitive, PrimitiveOptions } from 'graphics/Primitive';
import {
    VertexBuffer, VertexBufferGroup, VertexAttributeSemantic,
    IndexBuffer, IndexBufferOptions
} from 'graphics/buffers';
import { ShaderSourceDefine } from 'graphics/shaders';

export interface GeometryOptions {
    vertices: VertexBufferGroup;
    indices: IndexBufferOptions;
    primitive: PrimitiveOptions;
}

export class Geometry extends BaseObject {
    public vertices: Nullable<VertexBufferGroup>;
    public indices: Nullable<IndexBuffer>;
    public primitive: Nullable<Primitive>;

    constructor(options: Partial<GeometryOptions> = {}) {
        super();
        this.vertices = null;
        this.indices = null;
        this.primitive = null;

        if (options.vertices) {
            this.addVertices(options.vertices);
        }

        if (options.indices) {
            this.addIndices(new IndexBuffer(options.indices));
        }

        if (options.primitive) {
            this.addPrimitive(new Primitive(options.primitive));
        }
    }

    addVertices(vertices: VertexBufferGroup) {
        this.vertices = vertices;

        return this;
    }

    removeVertices() {
        this.vertices = null;

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
        return super.toJSON();
    }

    toShaderSourceDefine(): ShaderSourceDefine {
        const define = {} as ShaderSourceDefine;

        if (!this.vertices) return define;

        for (const semantic in VertexAttributeSemantic) {
            const vertexBuffer = this.vertices[semantic as VertexAttributeSemantic];

            if (vertexBuffer) {
                define[`HAS_VERTEX_${semantic}`] = 1;
            }
        }

        return define;
    }
}
