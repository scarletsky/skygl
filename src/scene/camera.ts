import Node from "./node";
import Vec4 from "math/vec4";
import Mat4 from "math/mat4";

export default class Camera extends Node {
    public static readonly PERSPECTIVE = 0;

    public mode = Camera.PERSPECTIVE;
    public viewMatrix = new Mat4();
    public projectionMatrix = new Mat4();
    public viewport = new Vec4(0, 0, 1, 1);

    private _fov = 45;
    private _aspect = 1;
    private _nearClip = 0.1;
    private _farClip = 1000;

    constructor() {
        super();
        this.updateProjectionMatrix();
    }

    get fov() {
        return this._fov;
    }

    set fov(value: number) {
        this._fov = value;
        this.updateProjectionMatrix();
    }

    get aspect() {
        return this._aspect;
    }

    set aspect(value: number) {
        this._aspect = value;
        this.updateProjectionMatrix();
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

    public updateProjectionMatrix() {
        this.projectionMatrix.setPerspective(this._fov, this._aspect, this._nearClip, this._farClip);
    }
}
