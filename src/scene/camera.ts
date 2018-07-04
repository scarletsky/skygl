import Node from "./node";
import Mat4 from "../math/mat4";

export default class Camera extends Node {
    public viewMatrix = new Mat4();
    public projectionMatrix = new Mat4();

    constructor() {
        super();
    }
}
