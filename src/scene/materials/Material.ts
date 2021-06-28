import { Shader, ShaderSourceDefine } from 'graphics/shaders/Shader';
import { isString, isBoolean } from 'utils';
import { Nullable } from 'types';

export interface MaterialOptions {
    name?: string
    transparent?: boolean;
}

export class Material {
    public name: string;
    public transparent: boolean;
    public shader: Nullable<Shader>;

    constructor(options: MaterialOptions = {}) {
        this.name = isString(options.name) ? options.name : '';
        this.transparent = isBoolean(options.transparent) ? options.transparent : false;
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
