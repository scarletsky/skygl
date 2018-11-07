import Light from "./light";
import { Vec3, Quat } from "math"
import { Device } from "graphics";

const quatA = new Quat();

export default class DirectionalLight extends Light {
    public type = Light.TYPE_DIRECTIONAL;

    private _direction = new Vec3();

    public apply(device: Device, index: number) {
        const scope = device.scope;
        this.getWorldRotation(quatA);
        quatA.transformVector(Vec3.DOWN, this._direction);
        scope.setValue(`uDirectionalLights[0].direction`, this._direction);
        scope.setValue(`uDirectionalLights[${index}].color`, this.color);
    }
}
