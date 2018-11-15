import Light from "./light";
import Vec4 from "math/vec4";
import { Device } from "graphics";

export default class PointLight extends Light {
    public type = Light.TYPE_POINT;
    public range = 10;
    public attenuation = new Vec4(1.0, 0.09, 0.0032, 0.0);

    public apply(device: Device, index: number) {
        const scope = device.scope;
        this.worldMatrix.getTranslation(this.worldPosition);
        scope.setValue(`uPointLights[${index}].position`, this.worldPosition);
        scope.setValue(`uPointLights[${index}].color`, this.color);
        scope.setValue(`uPointLights[${index}].range`, this.range);
        scope.setValue(`uPointLights[${index}].attenuation`, this.attenuation);
    }
}
