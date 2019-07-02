import Material from "./material";
import { Device, Cubemap } from "graphics";

export default class SkyboxMaterial extends Material {
    public environmentMap = null as Cubemap;
    public environmentMipLevel = 0;
    public cullFace = Material.CULLFACE_FRONT;
    public depthFunc = Material.DEPTHFUNC_LEQUAL;

    public apply(device: Device) {
        super.apply(device);
        const scope = device.scope;
        scope.setValue("uEnvironmentMap", this.environmentMap);

        if (this.environmentMap) {

            if (this.environmentMap.irradianceMap) {
                scope.setValue("uIrradianceMap", this.environmentMap.irradianceMap);
            }

            if (this.environmentMipLevel > 0) {
                let prefilteredCubemap = this.environmentMap.prefilteredCubemaps[this.environmentMipLevel - 1];

                if (prefilteredCubemap) {
                    scope.setValue("uEnvironmentMap", prefilteredCubemap);
                }
            }
        }
    }
}
