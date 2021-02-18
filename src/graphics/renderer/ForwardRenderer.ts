import { Device } from 'graphics/Device';
import { Renderer, RendererOptions } from './Renderer';

export interface ForwardRendererOptions extends RendererOptions {

}

export class ForwardRenderer extends Renderer {

    constructor(device: Device) {
        super(device);
    }

}
