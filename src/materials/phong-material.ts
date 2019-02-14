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
    public diffuse = new Color(1, 1, 1, 1);
    public diffuseMap = null as Texture;
    public specular = new Color(1, 1, 1, 1);
    public specularmMap = null as Texture;
    public shininess = 25;

    constructor(parameters: PhongMaterialParameters) {
        super(parameters);
    }

    public apply(device: Device) {
        const scope = device.scope;
        scope.setValue("uMaterial.diffuse", this.diffuse);
        scope.setValue("uMaterial.diffuseMap", this.diffuseMap);
        scope.setValue("uMaterial.specular", this.specular);
        scope.setValue("uMaterial.specularMap", this.specularMap);
        scope.setValue("uMaterial.shininess", this.shininess);
    }
}
