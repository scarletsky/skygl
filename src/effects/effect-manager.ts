import Pass from "./pass";
import { Renderer } from "renderers";

export default class EffectManager {
    public renderer: Renderer;
    public queue = [] as Pass[];

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    public add(pass: Pass) {
        const canvas = this.renderer.device.canvas;

        if (pass.autoResize) {
            pass.output.resize(canvas.width, canvas.height);
        }

        this.queue.push(pass);
    }

    public remove(id: number | Pass) {
        let index;

        if (id instanceof Pass) {
            index = this.queue.indexOf(id);
        } else {
            index = id;
        }

        if (index > -1) {
            this.queue.splice(index, 1);
        }
    }

    public render() {

        if (this.queue.length === 0) return;

        const renderer = this.renderer;
        const device = renderer.device;
        device.setViewport(0, 0, device.canvas.width, device.canvas.height);

        for (let i = 0; i < this.queue.length; i++) {
            if (i === 0) {
                this.queue[i].render(renderer);
            } else {
                this.queue[i].render(renderer, this.queue[i - 1].output);
            }
        }
    }
}
