import Device from "graphics/device";
import Material, { MaterialParameters } from "./material";
import Color from "math/color";
import Texture from "graphics/texture";

interface BasicMaterialParameters extends MaterialParameters {
    vertexColors?: boolean;
    diffuse?: number[];
    colorMap?: Texture;
}

export default class BasicMaterial extends Material {
    public color = new Color(1, 1, 1, 1);
    public colorMap = null as Texture;
    public vertexColor = false;

    constructor(parameters: BasicMaterialParameters) {
        super(parameters);
    }

    public apply(device: Device) {
        super.apply(device);
        const scope = device.scope;
        scope.setValue("uColor", this.color);
        scope.setValue("uColorMap", this.colorMap);
    }
}
