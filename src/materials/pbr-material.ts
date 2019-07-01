import Material, { MaterialParameters } from "./material";
import { Texture, Device } from "graphics";
import { Color } from "math";

export interface PBRMaterialParameters extends MaterialParameters {
    ambient: Color;
    color: Color;
    colorMap: Texture;
    roughness: number;
    roughnessMap: Texture;
    metalness: number;
    metalnessMap: Texture;
    normalMap: Texture;
    normalMapFactor: number;
    aoFactor: number;
    aoMap: Texture;
}

export default class PBRMaterial extends Material {
    public shading = Material.SHADING_PBR;
    public color = new Color(1, 1, 1, 1);
    public colorMap = null as Texture;
    public roughness = 1;
    public roughnessMap = null as Texture;
    public metalness = 0;
    public metalnessMap = null as Texture;
    public normalMap = null as Texture;
    public normalMapFactor = 1;
    public aoFactor = 1;
    public aoMap = null as Texture;

    public apply(device: Device) {
        super.apply(device);
        const scope = device.scope;
        scope.setValue("uColor", this.color);
        scope.setValue("uColorMap", this.colorMap);
        scope.setValue("uRoughnessFactor", this.roughness);
        scope.setValue("uRoughnessMap", this.roughnessMap);
        scope.setValue("uMetalnessFactor", this.metalness);
        scope.setValue("uMetalnessMap", this.metalnessMap);
        scope.setValue("uNormalMap", this.normalMap);
        scope.setValue("uNormalMapFactor", this.normalMap);
        scope.setValue("uAOFactor", this.aoFactor);
        scope.setValue("uAOMap", this.aoMap);
    }
}
