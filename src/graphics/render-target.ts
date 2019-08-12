import Device from "./device";
import Texture from "./texture";
import { IResize } from "interfaces";

let idCounter = 0;

export interface RenderTargetParameters {
    name?: string;
    colorBuffer?: Texture;
    depthBuffer?: Texture;
}

export interface RenderTargetState {
    renderTarget: RenderTarget;
    viewport: [number, number, number, number];
    colorWrite: [boolean, boolean, boolean, boolean];
    depthTest: boolean;
    depthWrite: boolean;
    depthFunc: number;
    cullFace: number;
}

export type RenderTargetBufferTarget = "colorBuffer" | "depthBuffer";

export default class RenderTarget implements IResize {
    public static TARGET_COLOR_BUFFER = "colorBuffer" as RenderTargetBufferTarget;
    public static TARGET_DEPTH_BUFFER = "depthBuffer" as RenderTargetBufferTarget;

    public id = idCounter++;
    public name: string;
    public colorBuffer: Texture;
    public depthBuffer: Texture;
    public _glFrameBufferId: WebGLFramebuffer;

    constructor(params: RenderTargetParameters = {}) {
        this.name = params.name || "Untitled";
        this.colorBuffer = params.colorBuffer || null;
        this.depthBuffer = params.depthBuffer || null;
    }

    public attach(target: RenderTargetBufferTarget, texture: Texture) {
        this[target] = texture;
    }

    public detach(target: RenderTargetBufferTarget) {
        this[target] = null;
    }

    public resize(width: number, height: number) {
        if (this.colorBuffer) {
            this.colorBuffer.resize(width, height);
        }

        if (this.depthBuffer) {
            this.depthBuffer.resize(width, height);
        }
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

    public destroy(device: Device, clearBuffers = false) {
        const gl = device.gl;

        if (clearBuffers && this.colorBuffer) {
            this.colorBuffer.destroy(device);
        }

        if (clearBuffers && this.depthBuffer) {
            this.depthBuffer.destroy(device);
        }

        if (this._glFrameBufferId) {
            gl.deleteFramebuffer(this._glFrameBufferId);
            this._glFrameBufferId = null;
        }
    }
}
