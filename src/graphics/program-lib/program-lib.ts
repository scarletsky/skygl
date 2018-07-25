import Device from "../device";
import Shader from "../shader";
import Material from "../../scene/material";
import BasicMaterial from "../../scene/basic-material";
import * as ShaderLib from "./shader-lib";

interface ProgramKeyOptions {
    [key: string]: any;
}

interface ProgramsCached {
    [key: string]: Shader;
}

export default class ProgramLib {
    public static readonly MATERIAL_KEY = {};
    public _cached = {} as ProgramsCached;
    public device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    public getProgram(material: Material) {
        let type = this.getMaterialType(material) as keyof typeof ShaderLib;
        let options = this.generateOptions(material);
        let key = this.generateKey(type, options);

        if (!this._cached[key]) {
            this._cached[key] = new Shader(this.device, {
                defines: options,
                vshader: ShaderLib[type].vshader,
                fshader: ShaderLib[type].fshader
            });
        }

        return this._cached[key];
    }

    private getMaterialType(material: Material) {
        if (material instanceof BasicMaterial) return "basic";
        if (material instanceof Material) return "raw";
    }

    private generateKey(materialType: string, options: ProgramKeyOptions) {
        let chunks = [materialType];

        for (let k in options) {
            if (options[k]) {
                chunks.push(k);
            }
        }
        
        return chunks.join();
    }

    private generateOptions(material: Material): ProgramKeyOptions {
        return {
            ALPHA_TEST: material.alphaTest > 0,
            VERTEX_COLOR: !!material.vertexColor,
            DIFFUSE_MAP: !!material.diffuseMap,
            SKINNING: false
        };
    }
}
