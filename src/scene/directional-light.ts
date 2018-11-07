import Light from "./light";
import { Vec3, Quat } from "math"
import { Device } from "graphics";

const vecA = new Vec3();
const quatA = new Quat();

export default class DirectionalLight extends Light {
    public type = Light.TYPE_DIRECTIONAL;

    public apply(device: Device, index: number) {
        const scope = device.scope;
        this.getWorldRotation(quatA);
        quatA.transformVector(Vec3.DOWN, vecA);
        scope.setValue(`uDirectionalLights[0].direction`, vecA);
        scope.setValue(`uDirectionalLights[${index}].color`, this.color);
    }
}
