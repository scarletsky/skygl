import Device from "../graphics/device";
import Material, { MaterialParameters } from "./material";
import Vec4 from "../math/vec4";
import Texture from "../graphics/texture";

interface BasicMaterialParameters extends MaterialParameters {
    vertexColors?: boolean;
    diffuse?: number[];
    diffuseMap?: Texture;
}

export default class BasicMaterial extends Material {
    public diffuse = new Vec4(0, 0, 0, 1);
    public diffuseMap = null as Texture;
    public vertexColor = false;

    constructor(parameters: BasicMaterialParameters) {
        super(parameters);
    }

    public apply(device: Device) {
        const scope = device.scope;
        scope.setValue("uDiffuse", this.diffuse);
        scope.setValue("UDiffuseMap", this.diffuseMap);
    }
}
