import { Node } from 'scene/Node';
import { Device, DeviceOptions } from './graphics/Device';
import { Renderer, RendererOptions } from './graphics/renderer/Renderer';

export interface ApplicationOptions {
    device?: DeviceOptions;
    renderer?: RendererOptions;
}

export class Application {
    public device: Device;
    public renderer: Renderer;
    public root: Node;

    constructor(canvas: HTMLCanvasElement, options: ApplicationOptions = {}) {
        this.device = new Device(canvas, options.device);
        this.renderer = new Renderer(this.device, options.renderer);
        this.root = new Node();
    }
}
