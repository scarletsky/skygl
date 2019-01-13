import Camera, { CameraParameters } from "./camera";

export default class PerspectiveCamera extends Camera {
    protected _fov = 45;
    protected _aspect = 1;

    constructor(params: CameraParameters) {
        super(params);
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

    public updateProjectionMatrix() {
        this.projectionMatrix.setPerspective(this._fov, this._aspect, this._nearClip, this._farClip);
    }
}
