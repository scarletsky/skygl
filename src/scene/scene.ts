import Node from "./node";
import Mesh from "./mesh";
import Light, { SortedLights } from "./light";
import { Color } from "math";
import { Device } from "graphics";

export default class Scene extends Node {
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

    public prepare() {
        this.meshes.length = 0;
        this.lights.forEach((lights) => lights.length = 0);
        this.project(this);
    }

    public apply(device: Device) {
        const scope = device.scope;
        scope.setValue("uAmbient", this.ambient);
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
