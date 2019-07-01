import Material from "./material";
import { Device, Cubemap } from "graphics";

export default class SkyboxMaterial extends Material {
    public environmentMap = null as Cubemap;
    public irradianceMap = null as Cubemap;
    public cullFace = Material.CULLFACE_FRONT;
    public depthFunc = Material.DEPTHFUNC_LEQUAL;

    public apply(device: Device) {
        super.apply(device);
        const scope = device.scope;
        scope.setValue("uEnvironmentMap", this.environmentMap);
        scope.setValue("uIrradianceMap", this.irradianceMap);
    }
}
