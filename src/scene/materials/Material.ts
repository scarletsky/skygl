import { Shader, ShaderSourceDefine } from 'graphics/shaders/Shader';
import { isString, isBoolean } from 'utils';
import { Nullable } from 'types';
import { RenderState } from 'graphics/renderers/RenderState';

export interface MaterialOptions {
    name?: string
    transparent?: boolean;
}

export class Material {
    public name = '';
    public transparent = false;
    public shader = null as Nullable<Shader>;

    constructor(options: MaterialOptions = {}) {
        this.fromJSON(options);
    }

    getShaderSourceDefine(): ShaderSourceDefine {
        return {

        };
    }

    fromJSON(options: MaterialOptions) {
        this.name = isString(options.name) ? options.name : '';
        this.transparent = isBoolean(options.transparent) ? options.transparent : false;
        this.shader = null;
    }

    toJSON() {

    }

    onApplyShader(shader: Shader) {
        this.shader = shader;
    }

    onApplyRenderState(renderState: RenderState) {

    }
}
