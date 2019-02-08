import Device from "./device";
import Texture from "./texture";

let idCounter = 0;

export interface RenderTargetParameters {
    name?: string;
    colorBuffer?: Texture;
    depthBuffer?: Texture;
}

export default class RenderTarget {

    public id: number;
    public name: string;
    public colorBuffer: Texture;
    public depthBuffer: Texture;
    public _glFrameBufferId: WebGLFramebuffer;

    constructor(params: RenderTargetParameters = {}) {
        this.id = idCounter++;
        this.name = params.name || "Untitled";
        this.colorBuffer = params.colorBuffer || null;
        this.depthBuffer = params.depthBuffer || null;
    }

    public apply(device: Device) {
        const gl = device.gl;
        let textureUnit = 0;

        if (!this._glFrameBufferId) {
            this._glFrameBufferId = gl.createFramebuffer();
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this._glFrameBufferId);

        if (this.colorBuffer) {
            this.colorBuffer.apply(device, textureUnit);
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl.COLOR_ATTACHMENT0,
                gl.TEXTURE_2D,
                this.colorBuffer._glTextureId,
                0
            );
            textureUnit++;
        }

        if (this.depthBuffer) {
            this.depthBuffer.apply(device, textureUnit);
            gl.framebufferTexture2D(
                gl.FRAMEBUFFER,
                gl.DEPTH_ATTACHMENT,
                gl.TEXTURE_2D,
                this.depthBuffer._glTextureId,
                0
            );
        }

        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        switch (status) {
            case gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                console.error("ERROR: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
                break;
            case gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                console.error("ERROR: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
                break;
            case gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                console.error("ERROR: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
                break;
            case gl.FRAMEBUFFER_UNSUPPORTED:
                console.error("ERROR: FRAMEBUFFER_UNSUPPORTED");
                break;
            case gl.FRAMEBUFFER_COMPLETE:
                break;
        }
    }
}
