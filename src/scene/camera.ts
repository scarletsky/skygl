import Node from "./node";
import Mat4 from "../math/mat4";

export default class Camera extends Node {
    public viewMatrix = new Mat4();
    public projectionMatrix = new Mat4();

    constructor() {
        super();
    }

    public updateWorldMatrix(force: boolean = false) {
        super.updateWorldMatrix(force);
        this.viewMatrix.copy(this.worldMatrix).invert();
    }
}
