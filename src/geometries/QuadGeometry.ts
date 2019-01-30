import Geometry from "scene/geometry";
import VertexBuffer from "graphics/vertex-buffer";
import IndexBuffer from "graphics/index-buffer";
import Primitive from "graphics/primitive";

export default class QuadGeometry extends Geometry {
    /*
      0_____3
      |     |
      |     |
      1_____2
    */

    static create(geometry: Geometry) {
        if (geometry === undefined) geometry = new QuadGeometry();

        const positions = [
            -1, 1, 0,
            -1, -1, 0,
            1, -1, 0,
            1, 1, 0
        ];
        const uvs = [
            0, 1,
            0, 0,
            1, 0,
            1, 1
        ];
        const indices = [0, 1, 2, 3];

        geometry.addAttribute(
            Geometry.ATTRIBUTE_POSITION,
            new VertexBuffer(new Float32Array(positions), 3)
        );
        geometry.addAttribute(
            Geometry.ATTRIBUTE_TEXCOORD_0,
            new VertexBuffer(new Float32Array(uvs), 2)
        );
        geometry.primitive = new Primitive(
            Primitive.TRIANGLE_FAN,
            new IndexBuffer(new Uint8Array(indices))
        );
    }

    constructor() {
        super();
        QuadGeometry.create(this);
    }
}
