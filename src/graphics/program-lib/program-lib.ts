import Device from "../device";
import Shader from "../shader";
import { Scene, Mesh } from "scene";
import { Material, BasicMaterial, PhongMaterial, DepthMaterial, SkyboxMaterial } from "materials";
import Light, { SortedLights } from "lights/light";
import * as ShaderLib from "./shader-lib";
import { Geometry } from "geometries";

interface ProgramKeyOptions {
    [key: string]: boolean | number | string;
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

    public getProgram(source: Mesh | Material, scene?: Scene) {
        let geometry, material;
        let options = {};

        if (source instanceof Mesh) {
            geometry = source.geometry;
            material = source.material;
        } else if (source instanceof Material) {
            material = source;
        }

        const type = this.getMaterialType(material) as keyof typeof ShaderLib;

        if (scene) {
            options = this.generateOptions(geometry, material, scene.lights);
        }

        const key = this.generateKey(type, options);

        if (!this._cached[key]) {
            this._cached[key] = new Shader({
                defines: options,
                vshader: ShaderLib[type].vshader,
                fshader: ShaderLib[type].fshader
            });
        }

        return this._cached[key];
    }

    private getMaterialType(material: Material) {
        if (material instanceof DepthMaterial) return "depth";
        if (material instanceof PhongMaterial) return "phong";
        if (material instanceof SkyboxMaterial) return "skybox";
        if (material instanceof BasicMaterial) return "basic";
        if (material instanceof Material) return "raw";
    }

    private generateKey(materialType: string, options: ProgramKeyOptions) {
        const chunks = [materialType];

        for (const k in options) {
            if (options[k]) {
                chunks.push(k);
            }
        }

        return chunks.join();
    }

    private generateOptions(geometry: Geometry, material: Material, lights: SortedLights): ProgramKeyOptions {
        const options = Object.assign(material.getProgramOptions(), {
            NUM_DIRECTIONAL_LIGHTS: lights[Light.TYPE_DIRECTIONAL].length,
            NUM_POINT_LIGHTS: lights[Light.TYPE_POINT].length,
            NUM_SPOT_LIGHTS: lights[Light.TYPE_SPOT].length,
            USE_TBN: !!(geometry && geometry.attributes.tangent),
            SHADOW_MAP: true,
            SKINNING: false
        }) as ProgramKeyOptions;

        return options;
    }
}
