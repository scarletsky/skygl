import Camera, { CameraParameters } from "./camera";
import { Device } from "graphics";

export interface OrthographicCameraParameters extends CameraParameters{
    left?: number;
    right?: number;
    bottom?: number;
    top?: number;
    near?: number;
    far?: number;
}

export default class OrthographicCamera extends Camera {

    protected _left: number;
    protected _right: number;
    protected _bottom: number;
    protected _top: number;
    protected _near: number;
    protected _far: number;

    constructor(params: OrthographicCameraParameters = {}) {
        super(params);
        this._left = params.left !== undefined ? params.left : -1;
        this._right = params.right !== undefined ? params.right : 1;
        this._bottom = params.bottom !== undefined ? params.bottom : -1;
        this._top = params.top !== undefined ? params.top : 1;
        this._near = params.near !== undefined ? params.near : 0.1;
        this._far = params.far !== undefined ? params.far : 1000;

        this.updateProjectionMatrix();
    }

    public updateProjectionMatrix() {
        this.projectionMatrix.setOrtho(this._left, this._right, this._bottom, this._top, this._near, this._far);
    }

    public apply(device: Device) {
        const scope = device.scope;
        scope.setValue("uViewMatrix", this.viewMatrix);
        scope.setValue("uProjectionMatrix", this.projectionMatrix);
    }
}
