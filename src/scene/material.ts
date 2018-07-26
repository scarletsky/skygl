import Shader from "../graphics/shader";

let idCounter = 0;

export interface MaterialParameters {
    alphaTest?: boolean;
    depthTest?: boolean;
    depthWrite?: boolean;
    redWrite?: boolean;
    greenWrite?: boolean;
    blueWrite?: boolean;
    alphaWrite?: boolean;
    cullFace?: number;
    [key: string]: any;
}

interface MaterialUniforms {
    [prop: string]: any;
}

export default abstract class Material {
    public static readonly CULLFACE_NONE = 0;
    public static readonly CULLFACE_BACK = 1;
    public static readonly CULLFACE_FRONT = 2;
    public static readonly CULLFACE_FRONT_AND_BACK = 3;

    public _needsUpdate = true;
    public shader: Shader;
    public id = idCounter++;
    public name = "Untitled";
    public alphaTest = 0;
    public alphaToCoverage = false;
    public depthTest = true;
    public depthWrite = true;
    public redWrite = true;
    public greenWrite = true;
    public blueWrite = true;
    public alphaWrite = true;
    public uniforms = {} as MaterialUniforms;
    public cullFace = Material.CULLFACE_BACK;
    [key: string]: any;

    constructor(params: MaterialParameters = {}) {
        this.id = idCounter++;
        this.initialize(params);
    }

    private initialize(params: MaterialParameters) {
        for (const key in params) {
            const value = params[key];
            this[key] = value;
        }
    }

    public setShader(shader: Shader) {
        this.shader = shader;
    }

    public setUniform(prop: string, value: any) {
        // FIXME material.uniforms should not use the reference value
        this.uniforms[prop] = value;
    }

    public abstract update(): void;
}
