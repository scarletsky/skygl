import { Vec3, Quat } from "math"
import { Device } from "graphics";
import Light from "./light";
import DirectionalLightShadow from "scene/directional-light-shadow";

const quatA = new Quat();

export default class DirectionalLight extends Light {

    public type = Light.TYPE_DIRECTIONAL;
    public direction = new Vec3();
    public shadow: DirectionalLightShadow;

    constructor() {
        super();
        this.shadow = new DirectionalLightShadow(this);
    }

    public apply(device: Device, index: number) {
        const scope = device.scope;
        const uniformPrefix = `uDirectionalLights[${index}].`;
        this.getWorldRotation(quatA);
        quatA.transformVector(Vec3.DOWN, this.direction);
        scope.setValue(uniformPrefix + "direction", this.direction);
        scope.setValue(uniformPrefix + "color", this.color);
        scope.setValue(uniformPrefix + "intensity", this.intensity);
        scope.setValue(uniformPrefix + "castShadow", this.castShadow);
    }
}
