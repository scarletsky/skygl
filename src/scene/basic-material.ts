import Device from "graphics/device";
import Material, { MaterialParameters } from "./material";
import Color from "math/color";
import Texture from "graphics/texture";

interface BasicMaterialParameters extends MaterialParameters {
    vertexColors?: boolean;
    diffuse?: number[];
    diffuseMap?: Texture;
}

export default class BasicMaterial extends Material {
    public diffuse = new Color(1, 1, 1, 1);
    public diffuseMap = null as Texture;
    public vertexColor = false;

    constructor(parameters: BasicMaterialParameters) {
        super(parameters);
    }

    public apply(device: Device) {
        const scope = device.scope;
        scope.setValue("uDiffuse", this.diffuse);
        scope.setValue("uDiffuseMap", this.diffuseMap);
    }
}
