import VertexBuffer from "graphics/vertex-buffer";
import Primitive from "graphics/primitive";
import { IProgram } from "interfaces";

export type GeometryAttribute = "position" | "normal" | "tangent" | "color" | "uv0" | "uv1";

export interface GeometryAttributes {
    position?: VertexBuffer;
    normal?: VertexBuffer;
    tangent?: VertexBuffer;
    color?: VertexBuffer;
    uv0?: VertexBuffer;
    uv1?: VertexBuffer;
}

export default class Geometry implements IProgram {
    public static readonly ATTRIBUTE_POSITION = "position";
    public static readonly ATTRIBUTE_NORMAL = "normal";
    public static readonly ATTRIBUTE_TANGENT = "tangent";
    public static readonly ATTRIBUTE_COLOR = "color";
    public static readonly ATTRIBUTE_TEXCOORD_0 = "uv0";

    public attributes: GeometryAttributes;
    public primitive: Primitive;

    constructor() {
        this.attributes = {};
        this.primitive = null;
    }

    public addAttribute(name: GeometryAttribute, vertexBuffer: VertexBuffer) {
        this.attributes[name] = vertexBuffer;
    }

    public getProgramOptions() {
        return {
            USE_TBN: !!this.attributes.tangent
        };
    }
}
