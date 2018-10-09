import Node from "./node";
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

    public apply(device: Device) {
        const scope = device.scope;
        scope.setValue("uAmbient", this.ambient);
    }
}
