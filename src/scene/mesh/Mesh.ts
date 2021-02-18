import { Node } from 'scene/Node';
import { Geometry } from 'scene/geometry/Geometry';
import { Material } from 'scene/material/Material';
import { Drawable } from 'graphics/Drawable';
import { Device } from 'graphics/Device';
import { Primitive } from 'graphics/Primitive';
import { Shader } from 'graphics/shader/Shader';


export interface MeshOptions {
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
            vertices: this.geometry.vertices,
            indices: this.geometry.indices,
            primitive: (this.geometry.primitive as Primitive),
            shader: (this.material.shader as Shader)
        };
    }

    fromJSON(data: MeshOptions) {

    }

    toJSON() {
        return Object.assign(super.toJSON(), {
            material: this.material.toJSON()
        });
    }
}
