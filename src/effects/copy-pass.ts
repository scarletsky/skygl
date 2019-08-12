import Pass from "./pass";
import { RenderTarget, Texture } from "graphics";
import { Renderer } from "renderers";

export default class CopyPass extends Pass {
    constructor() {
        super();
        this.output = new RenderTarget();
        this.output.attach(RenderTarget.TARGET_COLOR_BUFFER, new Texture());
    }

    public render(renderer: Renderer, input: RenderTarget) {
        const device = renderer.device;
        const gl = device.gl;

        if (!this.output._glFrameBufferId) {
            this.output.apply(device);
        }

        if (device.webgl2 && gl instanceof WebGL2RenderingContext) {
            gl.bindFramebuffer(gl.READ_FRAMEBUFFER, input._glFrameBufferId);
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.output._glFrameBufferId);
            gl.blitFramebuffer(
                0, 0, input.colorBuffer.width, input.colorBuffer.height,
                0, 0, this.output.colorBuffer.width, this.output.colorBuffer.height,
                gl.COLOR_BUFFER_BIT,
                gl.NEAREST
            );
            gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
            gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
        } else {
            const lastRTState = device.getRenderTargetState();
            device.setRenderTarget(input);
            this.output.colorBuffer.apply(device);
            gl.copyTexImage2D(
                gl.TEXTURE_2D, 0, gl.RGBA,
                0, 0, this.output.colorBuffer.width, this.output.colorBuffer.height,
                0
            );
            device.setRenderTargetState(lastRTState);
        }

    }
}
