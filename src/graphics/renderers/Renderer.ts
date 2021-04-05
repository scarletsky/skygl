import { Device } from 'graphics/Device';
import { Camera } from 'scene/cameras/Camera';
import { Scene } from 'scene/Scene';

export class RendererOptions {

}

export class Renderer {
    public device: Device;

    constructor(device: Device, options: RendererOptions = {}) {
        this.device = device;
    }

    render(scene: Scene, camera: Camera) {

    }
}
