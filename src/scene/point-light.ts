import Light from "./light";
import Vec4 from "math/vec4";
import { Device } from "graphics";

export default class PointLight extends Light {
    public type = Light.TYPE_POINT;
    public range = 10;
    public attenuation = new Vec4(1.0, 0.0, 0.0, 0.0);

    public apply(device: Device) {
        const scope = device.scope;
        scope.setValue("uLightPosition", this.getWorldPosition());
        scope.setValue("uLightColor", this.color);
        scope.setValue("uLigtIntensity", this.intensity);
        scope.setValue("uLightRange", this.range);
        scope.setValue("uLightAttenuation", this.attenuation);
    }
}
