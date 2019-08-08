import Pass from "./pass";
import { Renderer } from "renderers";
import { Camera } from "cameras";
import { Scene } from "scene";
import { RenderTarget, Texture } from "graphics";

export default class RenderPass extends Pass {
    public scene: Scene;
    public camera: Camera;

    constructor(scene: Scene, camera: Camera) {
        super();
        this.scene = scene;
        this.camera = camera;
        this.output = new RenderTarget();
        this.output.attach(RenderTarget.TARGET_COLOR_BUFFER, new Texture());
        this.output.attach(RenderTarget.TARGET_DEPTH_BUFFER, new Texture({
            mipmaps: false,
            magFilter: Texture.NEAREST,
            minFilter: Texture.NEAREST,
            format: Texture.DEPTH_COMPONENT,
            internalFormat: Texture.DEPTH_COMPONENT32F,
            internalFormatType: Texture.FLOAT
        }));
    }

    public render(renderer: Renderer) {
        const device = renderer.device;

        if (!this.renderToScreen) {
            device.setRenderTarget(this.output);
        }

        renderer.render(this.scene, this.camera);
        device.setRenderTarget(null);
    }
}
