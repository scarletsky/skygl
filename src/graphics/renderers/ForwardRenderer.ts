import { Device } from 'graphics/Device';
import { Scene } from 'scene/Scene';
import { Camera } from 'scene/cameras';
import { Mesh } from 'scene/meshes';
import { Renderer, RendererOptions } from './Renderer';
import { RenderState } from './RenderState';
import { Nullable } from 'types';

export interface ForwardRendererOptions extends RendererOptions {

}

export class ForwardRenderer extends Renderer {
    public renderState: Nullable<RenderState>;

    constructor(device: Device) {
        super(device);
        this.renderState = null;
    }

    renderMesh(camera: Camera, mesh: Mesh) {
        const { device } = this;
        const renderState = this.renderState as RenderState;
        renderState.prepareShader(device, mesh);
        camera.onGLBind(device);
        mesh.onGLBind(device);
        device.draw(mesh.toDrawable());
    }

    render(camera: Camera, scene: Scene) {
        const renderState = this.renderState = new RenderState(camera, scene);
        renderState.opaqueMeshes.forEach(mesh => this.renderMesh(camera, mesh));
        renderState.transparentMeshes.forEach(mesh => this.renderMesh(camera, mesh));
    }
}
