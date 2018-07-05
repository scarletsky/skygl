import VertexBuffer from "../graphics/vertex-buffer";
import Primitive from "../graphics/primitive";

export default class Geometry {

    public attributes: { [attribute: string]: VertexBuffer };
    public primitive: Primitive;

    constructor() {
        this.attributes = {};
        this.primitive = null;
    }

    public addAttribute(name: string, vertexBuffer: VertexBuffer) {
        this.attributes[name] = vertexBuffer;
    }
}
