import Light from "./light";
import { Vec3, Quat } from "math"
import { Device } from "graphics";

const quatA = new Quat();

export default class DirectionalLight extends Light {
    public type = Light.TYPE_DIRECTIONAL;
    public direction = new Vec3();

    public apply(device: Device, index: number) {
        const scope = device.scope;
        this.getWorldRotation(quatA);
        quatA.transformVector(Vec3.DOWN, this.direction);
        scope.setValue(`uDirectionalLights[${index}].direction`, this.direction);
        scope.setValue(`uDirectionalLights[${index}].color`, this.color);
        scope.setValue(`uDirectionalLights[${index}].intensity`, this.intensity);
    }
}
