import Node, { NodeParameters } from "./node";
import Vec4 from "math/vec4";
import Mat4 from "math/mat4";
import Color from "math/color";
import { Device, RenderTarget } from "graphics";

export interface CameraParameters extends NodeParameters {
    mode?: number;
    renderTarget?: RenderTarget;
}

export default abstract class Camera extends Node {
    public static readonly PERSPECTIVE = 0;

    public mode = Camera.PERSPECTIVE;
    public viewMatrix = new Mat4();
    public projectionMatrix = new Mat4();
    public viewport = new Vec4(0, 0, 1, 1);
    public clearColor = new Color(0, 0, 0, 1);
    public clearColorBuffer = true;
    public renderTarget = null as RenderTarget;

    protected _nearClip = 0.1;
    protected _farClip = 1000;

    public abstract apply(device: Device): void;
    public abstract updateProjectionMatrix(): void;

    constructor(params: CameraParameters = {}) {
        super();
        this.renderTarget = params.renderTarget || null;
    }

    get nearClip() {
        return this._nearClip;
    }

    set nearClip(value: number) {
        this._nearClip = value;
        this.updateProjectionMatrix();
    }

    get farClip() {
        return this._farClip;
    }

    set farClip(value: number) {
        this._farClip = value;
        this.updateProjectionMatrix();
    }

    public updateWorldMatrix() {
        super.updateWorldMatrix();
        this.updateViewMatrix();
    }

    public updateViewMatrix() {
        this.viewMatrix.copy(this.worldMatrix).invert();
    }

}
