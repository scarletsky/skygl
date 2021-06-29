import { RenderState, Texture } from 'graphics';
import { Color } from 'math';
import { Nullable } from 'types';
import { Material, MaterialOptions } from './Material';

export interface LambertMaterialOptions extends MaterialOptions {

}

export class LambertMaterial extends Material {
    public diffuse = new Color();
    public diffuseMap = null as Nullable<Texture>;

    constructor(options: LambertMaterialOptions = {}) {
        super(options);
        this.fromJSON(options);
    }

    onApplyRenderState(renderState: RenderState) {
        super.onApplyRenderState(renderState);
    }
}
