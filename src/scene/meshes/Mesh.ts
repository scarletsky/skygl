import { Node, NodeOptions } from 'scene/Node';
import { Geometry } from 'scene/geometries/Geometry';
import { Material } from 'scene/materials/Material';
import { Drawable } from 'graphics/Drawable';
import { Primitive } from 'graphics/Primitive';
import { Shader } from 'graphics/shaders/Shader';
import { RenderState } from 'graphics/renderers/RenderState';
import { VertexBufferGroup } from 'graphics/buffers';


export interface MeshOptions extends NodeOptions {
    geometry: Geometry;
    material: Material;
}

export class Mesh extends Node {
    public geometry: Geometry;
    public material: Material;

    constructor(options: MeshOptions) {
        super();
        this.geometry = options.geometry;
        this.material = options.material;
    }

    toDrawable(): Drawable {
        return {
            vertices: this.geometry.vertices as VertexBufferGroup,
            indices: this.geometry.indices,
            primitive: (this.geometry.primitive as Primitive),
            shader: this.material.shader as Shader,
            material: this.material,
        };
    }

    fromJSON(options: MeshOptions) {

    }

    toJSON() {
        return Object.assign(super.toJSON(), {
            geometry: this.geometry.toJSON(),
            material: this.material.toJSON()
        });
    }
}
