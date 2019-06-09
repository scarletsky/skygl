import Material, { MaterialParameters } from "./material";
import Color from "math/color";
import { Device, Texture, Cubemap } from "graphics";

export interface PhongMaterialParameters extends MaterialParameters {
    ambient: Color;
    color: Color;
    colorMap: Texture;
    specular: Color;
    specularMap: Texture;
    emissive: Color;
    emissiveMap: Texture;
    normalMap: Texture;
    normalMapFactor: number;
    shininess: number;
}

export default class PhongMaterial extends Material {
    public shading = Material.SHADING_BLINN_PHONG;
    public color = new Color(1, 1, 1, 1);
    public colorMap = null as Texture;
    public specular = new Color(1, 1, 1, 1);
    public specularmMap = null as Texture;
    public emissive = new Color(0, 0, 0, 0);
    public emissiveMap = null as Texture;
    public normalMap = null as Texture;
    public normalMapFactor = 1;
    public shininess = 25;
    public environmentMap = null as Cubemap;
    public refractiveIndex = 1;

    constructor(parameters: PhongMaterialParameters) {
        super(parameters);
    }

    public apply(device: Device) {
        super.apply(device);
        const scope = device.scope;
        scope.setValue("uColor", this.color);
        scope.setValue("uColorMap", this.colorMap);
        scope.setValue("uSpecular", this.specular);
        scope.setValue("uSpecularMap", this.specularMap);
        scope.setValue("uEmissive", this.emissive);
        scope.setValue("uEmissiveMap", this.emissiveMap);
        scope.setValue("uNormalMap", this.normalMap);
        scope.setValue("uNormalMapFactor", this.normalMap);
        scope.setValue("uShininess", this.shininess);
        scope.setValue("uEnvironmentMap", this.environmentMap);
        scope.setValue("uRefractiveIndex", this.refractiveIndex);
    }

    public getProgramOptions() {
        return Object.assign(super.getProgramOptions(), {
            COLOR_MAP: !!this.colorMap,
            SPECULAR_MAP: !!this.specularMap,
            EMISSIVE_MAP: !!this.emissiveMap,
            NORMAL_MAP: !!this.normalMap,
            ENVIRONMENT_MAP: !!this.environmentMap,
            AMBIENT: !!this.ambient,
            USE_PHONG: this.shading === Material.SHADING_PHONG,
            USE_BLINN_PHONG: this.shading === Material.SHADING_BLINN_PHONG,
            USE_UV0: !!(this.colorMap || this.specularMap)
        });
    }
}
