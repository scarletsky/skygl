import Camera, { CameraParameters } from "./camera";
import { Device } from "graphics";
import { DEG_TO_RAD } from "math";

export default class PerspectiveCamera extends Camera {
    protected _fov = 45;
    protected _aspect = 1;
    public autoUpdateAspect = true;

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
        this.projectionMatrix.setPerspective(DEG_TO_RAD * this._fov, this._aspect, this._nearClip, this._farClip);
    }

    public apply(device: Device) {
        const scope = device.scope;

        if (this.autoUpdateAspect) {
            this.aspect = device.width / device.height;
        }

        scope.setValue("uViewPosition", this.getWorldPosition());
        scope.setValue("uViewMatrix", this.viewMatrix);
        scope.setValue("uProjectionMatrix", this.projectionMatrix);
    }
}
