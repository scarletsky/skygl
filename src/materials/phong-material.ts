import Material, { MaterialParameters } from "./material";
import Color from "math/color";
import { Device, Texture, Cubemap } from "graphics";

export interface PhongMaterialParameters extends MaterialParameters {
    ambient: Color;
    diffuse: Color;
    diffuseMap: Texture;
    specular: Color;
    specularMap: Texture;
    emissive: Color;
    emissiveMap: Texture;
    shininess: number;
}

export default class PhongMaterial extends Material {
    public diffuse = new Color(1, 1, 1, 1);
    public diffuseMap = null as Texture;
    public specular = new Color(1, 1, 1, 1);
    public specularmMap = null as Texture;
    public shininess = 25;
    public environmentMap = null as Cubemap;

    constructor(parameters: PhongMaterialParameters) {
        super(parameters);
    }

    public apply(device: Device) {
        super.apply(device);
        const scope = device.scope;
        scope.setValue("uDiffuse", this.diffuse);
        scope.setValue("uDiffuseMap", this.diffuseMap);
        scope.setValue("uSpecular", this.specular);
        scope.setValue("uSpecularMap", this.specularMap);
        scope.setValue("uShininess", this.shininess);
        scope.setValue("uEnvironmentMap", this.environmentMap);
    }
}
