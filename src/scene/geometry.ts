import VertexBuffer from "graphics/vertex-buffer";
import Primitive from "graphics/primitive";
import { createBox } from "scene/procedural";

export default class Geometry {
    public static readonly ATTRIBUTE_POSITION = "position";
    public static readonly ATTRIBUTE_NORMAL = "normal";
    public static readonly ATTRIBUTE_TANGENT = "tangent";
    public static readonly ATTRIBUTE_COLOR = "color";
    public static readonly ATTRIBUTE_TEXCOORD_0 = "uv0";

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
