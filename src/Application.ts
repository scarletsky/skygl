import { Node } from 'scene/Node';
import { Device, DeviceOptions } from './graphics/Device';
import { ForwardRenderer, RendererOptions } from './graphics/renderers';

export interface ApplicationOptions {
    device: DeviceOptions;
    renderer: RendererOptions;
}

export class Application {
    public device: Device;
    public renderer: ForwardRenderer;
    public root: Node;

    constructor(options: Partial<ApplicationOptions> = {}) {
        this.device = new Device(options.device);
        this.renderer = new ForwardRenderer(this.device);
        this.root = new Node();
    }
}
