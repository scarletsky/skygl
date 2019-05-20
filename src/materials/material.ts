import Device from "graphics/device";
import Shader from "graphics/shader";

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

export interface MaterialProgramOptions {
    [key: string]: boolean | number | string;
}

export default class Material {
    public static readonly CULLFACE_NONE = 0;
    public static readonly CULLFACE_BACK = 1;
    public static readonly CULLFACE_FRONT = 2;
    public static readonly CULLFACE_FRONT_AND_BACK = 3;
    public static readonly SHADING_CUSTOM = -1;
    public static readonly SHADING_LAMBERT = 0;
    public static readonly SHADING_PHONG = 1;
    public static readonly SHADING_BLINN_PHONG = 2;

    public shader: Shader;
    public shading = Material.SHADING_CUSTOM;
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
    public cullFace = Material.CULLFACE_BACK;
    public _needsUpdate = true;
    [key: string]: any;

    constructor(params: MaterialParameters = {}) {
        this.initialize(params);
    }

    protected initialize(params: MaterialParameters) {
        for (const key in params) {
            const value = params[key];
            this[key] = value;
        }
    }

    public apply(device: Device) {
        device.setDepthTest(this.depthTest);
        device.setDepthWrite(this.depthWrite);
        device.setCullFace(this.cullFace);
        device.setColorWrite(this.redWrite, this.greenWrite, this.blueWrite, this.alphaWrite);
    }

    public getProgramOptions(): MaterialProgramOptions {
        return {
            USE_ALPHA_TEST: this.alphaTest > 0,
            USE_VERTEX_COLOR: !!this.vertexColor,
        };
    }
}
