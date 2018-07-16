import VertexBuffer from "../graphics/vertex-buffer";
import Primitive from "../graphics/primitive";
import { createBox } from "../scene/procedural";

export default class Geometry {
    public static readonly ATTRIBUTE_POSITION = "POSITION";
    public static readonly ATTRIBUTE_NORMAL = "NORMAL";
    public static readonly ATTRIBUTE_TANGENT = "TANGENT";
    public static readonly ATTRIBUTE_COLOR = "COLOR";
    public static readonly ATTRIBUTE_TEXCOORD_0 = "TEXCOORD_0";

    public static createBox = createBox;
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
