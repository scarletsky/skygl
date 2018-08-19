import Device from "graphics/device";
import Material, { MaterialParameters } from "./material";
import Color from "math/color";
import Texture from "graphics/texture";

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
    public ambient = new Color(0.2, 0.2, 0.2, 1);
    public diffuse = new Color(1, 1, 1, 1);
    public diffuseMap = null as Texture;
    public specular = new Color(1, 1, 1, 1);
    public shininess = 25;

    constructor(parameters: PhongMaterialParameters) {
        super(parameters);
    }

    public apply(device: Device) {
        const scope = device.scope;
        scope.setValue("uAmbient", this.ambient);
        scope.setValue("uDiffuse", this.diffuse);
        scope.setValue("uDiffuseMap", this.diffuseMap);
        scope.setValue("uSpecular", this.specular);
        scope.setValue("uEmissive", this.emissive);
        scope.setValue("uShininess", this.shininess);
    }
}
