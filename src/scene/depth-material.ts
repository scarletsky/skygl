import Material from "./material";
import Device from "graphics/device";

export default class DepthMaterial extends Material {
    public depthPack = true;

    public apply(device: Device) {
        const scope = device.scope;
        scope.setValue("uDepthPack", this.depthPack);
    }
}
