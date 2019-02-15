import { Script } from "script/script";
import { Vec3, Quat } from "math";
import Camera from "cameras/camera";
import MouseEvent from "input/mouse-event";
import InputManager from "input/input-manager";

const vecA = new Vec3();
const vecB = new Vec3();
const vecC = new Vec3();

export default class OrbitControls extends Script<Camera> {
    public name = "OrbitControls";
    public pivot = new Vec3();
    public distance = 5;
    public orbitSensitivity = 0.3;
    public distanceSensitivity = 0.15;
    private _pitch = 0;
    private _yaw = 0;
    private orbitEnabled = false;
    private panEnabled = false;

    get pitch() {
        return this._pitch;
    }

    set pitch(value: number) {
        this._pitch = value;
    }

    get yaw() {
        return this._yaw;
    }

    set yaw(value: number) {
        this._yaw = value;
    }

    public onInitialize() {
        const mouse = InputManager.get("mouse");
        mouse.on("mousedown", this.onMouseDown, this);
        mouse.on("mouseup", this.onMouseUp, this);
        mouse.on("mousemove", this.onMouseMove, this);
        mouse.on("mousewheel", this.onMouseWheel, this);
    }

    public onUpdate() {
        vecA.set(this._pitch, this._yaw, 0);
        vecB.set(0, 0, 0);
        this.target.setLocalEulerAngles2(vecA);
        this.target.setLocalPosition2(vecB);

        vecB.copy(this.target.forward);
        vecB.scale(-this.distance);
        vecB.add(this.pivot);
        this.target.setWorldPosition2(vecB);
    }

    private onMouseDown(event: MouseEvent) {
        switch (event.button) {
            case 0:
                this.orbitEnabled = true;
                break;
            case 1:
                this.panEnabled = true;
                break;
        }
    }

    private onMouseUp() {
        this.orbitEnabled = false;
        this.panEnabled = false;
    }

    private onMouseMove(event: MouseEvent) {
        if (this.orbitEnabled) {
            this.pitch -= event.dy * this.orbitSensitivity;
            this.yaw -= event.dx * this.orbitSensitivity;
        }
    }

    private onMouseWheel(event: MouseEvent) {
        this.distance -= event.wheel * this.distanceSensitivity * (this.distance * 0.1);
    }
}
