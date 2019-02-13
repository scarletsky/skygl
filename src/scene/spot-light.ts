import Light from "./light";
import { Device } from "graphics";
import { Vec3, Quat, DEG_TO_RAD } from "math";
import SpotLightShadow from "./spot-light-shadow";

const quatA = new Quat();

export default class SpotLight extends Light {
    public type = Light.TYPE_SPOT;
    public innerConeAngle = 40;
    public outerConeAngle = 45;
    public direction = new Vec3();

    constructor() {
        super();
        this.shadow = new SpotLightShadow(this);
    }

    public apply(device: Device, index: number) {
        const scope = device.scope;
        this.worldMatrix.getTranslation(this.worldPosition);
        this.getWorldRotation(quatA);
        quatA.transformVector(Vec3.DOWN, this.direction);
        scope.setValue(`uSpotLights[${index}].position`, this.worldPosition);
        scope.setValue(`uSpotLights[${index}].direction`, this.direction);
        scope.setValue(`uSpotLights[${index}].color`, this.color);
        scope.setValue(`uSpotLights[${index}].intensity`, this.intensity);
        scope.setValue(`uSpotLights[${index}].innerConeRadian`, Math.cos(this.innerConeAngle * DEG_TO_RAD));
        scope.setValue(`uSpotLights[${index}].outerConeRadian`, Math.cos(this.outerConeAngle * DEG_TO_RAD));
    }
}
