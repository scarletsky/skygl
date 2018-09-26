import Node from "./node";

export default class Scene extends Node {
    private static _current = null as Scene;

    public static getCurrentScene() {
        return Scene._current;
    }

    public static setCurrentScene(scene: Scene) {
        Scene._current = scene;
    }

    public autoUpdate = true;

    constructor() {
        super();
    }
}
