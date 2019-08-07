import Device from "../device";
import Shader from "../shader";
import { Scene, Mesh } from "scene";
import {
    Material,
    BasicMaterial,
    PhongMaterial,
    DepthMaterial,
    SkyboxMaterial,
    PBRMaterial
} from "materials";
import * as ShaderLib from "./shader-lib";
import { Geometry } from "geometries";
import { ProgramOptions } from "interfaces";

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

    public getProgram(source: Mesh | Material, scene?: Scene) {
        let geometry, material;
        let key;
        let options = {};

        if (source instanceof Mesh) {
            geometry = source.geometry;
            material = source.material;
        } else if (source instanceof Material) {
            geometry = null;
            material = source;
        }

        const type = this.getMaterialType(material) as keyof typeof ShaderLib;

        if (material.shader) {
            key = type + `,SHADER_ID_${material.shader.id}`;
        } else {
            options = this.generateOptions(geometry, material, scene);
            key = this.generateKey(type, options);
        }

        if (!this._cached[key]) {
            this._cached[key] = material.shader || new Shader({
                defines: options,
                vshader: ShaderLib[type].vshader,
                fshader: ShaderLib[type].fshader
            });
        }

        return this._cached[key];
    }

    private getMaterialType(material: Material) {
        if (material instanceof DepthMaterial) return "depth";
        if (material instanceof PBRMaterial) return "pbr";
        if (material instanceof PhongMaterial) return "phong";
        if (material instanceof SkyboxMaterial) return "skybox";
        if (material instanceof BasicMaterial) return "basic";
        if (material instanceof Material) return "raw";
    }

    private generateKey(materialType: string, options: ProgramOptions) {
        const chunks = [materialType];

        for (const k in options) {
            if (options[k]) {
                chunks.push(`${k}=${options[k]}`);
            }
        }

        return chunks.join();
    }

    private generateOptions(geometry: Geometry | null, material: Material, scene?: Scene): ProgramOptions {
        const options = Object.assign(
            material.getProgramOptions(),
            scene ? scene.getProgramOptions() : {},
            geometry ? geometry.getProgramOptions() : {},
            {
                SHADOW_MAP: true,
                SKINNING: false
            }) as ProgramOptions;

        return options;
    }
}
