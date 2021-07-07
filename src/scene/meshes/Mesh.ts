import { Node, NodeOptions } from 'scene/Node';
import { Geometry } from 'scene/geometries/Geometry';
import { Material } from 'scene/materials/Material';
import { Drawable } from 'graphics/Drawable';
import { Primitive } from 'graphics/Primitive';
import { Shader } from 'graphics/shaders/Shader';
import { VertexBufferGroup } from 'graphics/buffers';
import { Device } from 'graphics/Device';


export interface MeshOptions extends NodeOptions {
    geometry: Geometry;
    material: Material;
}

export class Mesh extends Node {
    public geometry: Geometry;
    public material: Material;

    constructor(options: MeshOptions) {
        super(options);
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

    onGLBind(_device: Device) {
        const shader = this.material.shader as Shader;
        const uniforms = shader.uniforms;;
        uniforms.resolve('sky_ModelMatrix').setValue(this.localMatrix);
    }

    onGLUnbind(device: Device) {

    }
}
