import { Texture } from 'graphics';
import { Color, ColorOptions } from 'math';
import { Nullable } from 'types';
import { Material, MaterialOptions } from './Material';

export interface LambertMaterialOptions extends MaterialOptions {
    diffuse: ColorOptions;
    diffuseMap: Nullable<Texture>;
}

export class LambertMaterial extends Material {
    public diffuse = new Color();
    public diffuseMap = null as Nullable<Texture>;

    constructor(options: Partial<LambertMaterialOptions> = {}) {
        super(options);
        this.fromJSON(options);
    }

    toShaderLib() {
        return 'lambert';
    }

    fromJSON(options: Partial<LambertMaterialOptions>) {
        if (options.diffuse) this.diffuse.fromJSON(options.diffuse);
    }

    toJSON(): Partial<LambertMaterialOptions> {
        return {
            diffuse: this.diffuse.toJSON(),
        };
    }
}
