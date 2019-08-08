import { Renderer } from "renderers";
import { RenderTarget } from "graphics";

let idCounter = 0;

export default abstract class Pass {
    public id = idCounter++;
    public output: RenderTarget;
    public autoResize = true;
    public renderToScreen = false;
    public abstract render(renderer: Renderer, ...rest: any[]): void;
}
