import Node from "core/node";
import Light, { SortedLights } from "lights/light";
import { Color } from "math";
import { Device } from "graphics";
import Mesh from "./mesh";
import Skybox from "./skybox";
import { IProgram } from "interfaces";

export default class Scene extends Node implements IProgram {
    private static _current = null as Scene;

    public static getCurrentScene() {
        return Scene._current;
    }

    public static setCurrentScene(scene: Scene) {
        Scene._current = scene;
    }

    public autoUpdate = true;
    public ambient = new Color(0.2, 0.2, 0.2);
    public meshes = [] as Mesh[];
    public lights = [[], [], []] as SortedLights;
    public skybox = null as Skybox;

    public setSkybox(skybox: Skybox) {
        this.skybox = skybox;
    }

    public prepare() {
        this.meshes.length = 0;
        this.lights.forEach((lights) => lights.length = 0);
        this.project(this);
    }

    public apply(device: Device) {
        const scope = device.scope;
        scope.setValue("uAmbient", this.ambient);

        if (this.skybox) {
            this.skybox.material.apply(device);
        }
    }

    public getProgramOptions() {
        const environmentMap = this.skybox ? this.skybox.material.environmentMap : null;
        const irradianceMap = environmentMap ? environmentMap.irradianceMap : null;

        return {
            ENVIRONMENT_MAP: !!(environmentMap),
            IRRADIANCE_MAP: !!(irradianceMap),
            NUM_DIRECTIONAL_LIGHTS: this.lights[Light.TYPE_DIRECTIONAL].length,
            NUM_POINT_LIGHTS: this.lights[Light.TYPE_POINT].length,
            NUM_SPOT_LIGHTS: this.lights[Light.TYPE_SPOT].length,
        };
    }

    private project(node: Node) {
        if (!node.enabled) return;

        if (node instanceof Mesh) {
            this.meshes.push(node);
        } else if (node instanceof Light) {
            this.lights[node.type].push(node);
        }

        for (const child of node.children) {
            this.project(child);
        }
    }
}
