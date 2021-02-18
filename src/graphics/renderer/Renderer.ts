import { Device } from 'graphics/Device';

export class RendererOptions {

}

export class Renderer {
    public device: Device;

    constructor(device: Device, options: RendererOptions = {}) {
        this.device = device;
    }

    render() {

    }
}
