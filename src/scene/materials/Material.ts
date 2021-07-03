import { Shader, ShaderSourceDefine } from 'graphics/shaders/Shader';
import { isString, isBoolean } from 'utils';
import { Nullable } from 'types';
import { RenderState } from 'graphics/renderers/RenderState';
import { Device, LESS } from 'graphics';

export interface MaterialOptions {
    name?: string
    transparent?: boolean;
}

export class Material {
    public name = '';
    public transparent = false;
    public depthTest = true;
    public depthWrite = true;
    public depthFunc = LESS;
    public blend = false;
    public blendFuncSrc = 0;
    public blendFuncDst = 0;
    public shader = null as Nullable<Shader>;

    constructor(options: MaterialOptions = {}) {
        this.fromJSON(options);
    }

    fromJSON(options: MaterialOptions) {
        this.name = isString(options.name) ? options.name : '';
        this.transparent = isBoolean(options.transparent) ? options.transparent : false;
        this.shader = null;
    }

    toJSON() {

    }

    toShaderLib() {
        return '';
    }

    toShaderSourceDefine(): ShaderSourceDefine {
        return {

        };
    }

    onApplyShader(shader: Shader) {
        this.shader = shader;
    }

    onGLBind(device: Device) {
        // NOTE: depthTest, blending, etc...
        device.setDepthTest(this.depthTest);
        device.setDepthWrite(this.depthWrite);
    }

    onGLUnbind(device: Device) {

    }
}
