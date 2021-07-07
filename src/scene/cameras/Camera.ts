import { Frustum } from 'math/Frustum';;
import { Mat4 } from 'math/Mat4';
import { Node, NodeOptions } from '../Node';
import { Device } from 'graphics/Device';
import { UniformScope } from 'graphics/shaders';

export interface CameraOptions extends NodeOptions {

}

export class Camera extends Node {
    public viewMatrix: Mat4
    public projectionMatrix: Mat4;
    public frustum: Frustum;

    constructor(options: Partial<CameraOptions> = {}) {
        super(options);
        this.viewMatrix = new Mat4();
        this.projectionMatrix = new Mat4();
        this.frustum = new Frustum();
    }

    updateViewMatrix() {

    }

    updateProjectionMatrix() {

    }

    onGLBind(device: Device) {
        const globalUniforms = device.uniforms as UniformScope;

        globalUniforms.resolve('sky_ViewMatrix').setValue(this.viewMatrix);
        globalUniforms.resolve('sky_ProjectionMatrix').setValue(this.projectionMatrix);
    }

    onGLUnbind(device: Device) {

    }
}
