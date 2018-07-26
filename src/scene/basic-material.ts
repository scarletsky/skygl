import Material, { MaterialParameters } from "./material";
import Texture from "../graphics/texture";

interface BasicMaterialParameters extends MaterialParameters {
    vertexColors?: boolean;
    diffuse?: number[];
    diffuseMap?: Texture;
}

export default class BasicMaterial extends Material {
    public diffuse = [0, 0, 0, 1];
    public diffuseMap = null as Texture;
    public vertexColor = false;

    constructor(parameters: BasicMaterialParameters) {
        super(parameters);
        this.update();
    }

    public update() {
        if (this._needsUpdate === false) return;
        this._needsUpdate = false;

        this.setUniform("uDiffuse", this.diffuse);
        this.setUniform("UDiffuseMap", this.diffuseMap);
    }
}
