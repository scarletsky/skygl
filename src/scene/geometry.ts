import VertexBuffer from "../graphics/vertex-buffer";
import IndexBuffer from "../graphics/index-buffer";

export default class Geometry {
    public static readonly PRIMITIVE_POINTS = 0;
    public static readonly PRIMITIVE_LINES = 1;
    public static readonly PRIMITIVE_LINE_LOOP = 2;
    public static readonly PRIMITIVE_LINE_STRIP = 3;
    public static readonly PRIMITIVE_TRIANGLES = 4;
    public static readonly PRIMITIVE_TRIANGLE_STRIP = 5;
    public static readonly PRIMITIVE_TRIANGLE_FAN = 6;

    public vertexBuffers: { [attribute: string]: VertexBuffer };
    public indexBuffer: IndexBuffer;
    public primitive: number;
    public drawFirst: number;
    public drawCount: number;

    constructor() {
        this.vertexBuffers = {};
        this.indexBuffer = null;
        this.primitive = Geometry.PRIMITIVE_TRIANGLES;
        this.drawFirst = 0;
        this.drawCount = 0;
    }
}
