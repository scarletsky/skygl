import { Shader, ShaderSourceDefine } from 'graphics/shaders/Shader';
import { Nullable } from 'types';

export interface MaterialOptions {
    name?: string
}

export class Material {
    public name: string;
    public shader: Nullable<Shader>;

    constructor(options: MaterialOptions = {}) {
        this.name = options.name || '';
        this.shader = null;
    }

    getShaderSourceDefine(): ShaderSourceDefine {
        return {

        };
    }

    fromJSON(data: MaterialOptions) {

    }

    toJSON() {

    }
}
