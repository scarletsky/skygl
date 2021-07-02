import { Device } from 'graphics/Device';
import { Camera } from 'scene/cameras/Camera';
import { Scene } from 'scene/Scene';
import { Renderer, RendererOptions } from './Renderer';
import { RenderState } from './RenderState';

export interface ForwardRendererOptions extends RendererOptions {

}

export class ForwardRenderer extends Renderer {

    constructor(device: Device) {
        super(device);
    }

    render(scene: Scene, camera: Camera) {
        const { device } = this;
        const renderState = new RenderState(scene, camera);

        renderState.opaqueMeshes.forEach(mesh => device.draw(mesh.toDrawable()));
        renderState.transparentMeshes.forEach(mesh => device.draw(mesh.toDrawable()));
    }
}
