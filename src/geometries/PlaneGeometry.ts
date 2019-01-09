import Geometry from "scene/geometry";
import VertexBuffer from "graphics/vertex-buffer";
import IndexBuffer from "graphics/index-buffer";
import Primitive from "graphics/primitive";

export default class PlaneGeometry extends Geometry {

    // Generate plane as follows (assigned UVs denoted at corners):
    //         width
    // (0,1)a---------c(1,1)
    //      |         |
    //      |         |
    //      |    O--X |height
    //      |    |    |
    //      |    Z    |
    // (0,0)b---------d(1,0)

    static create(geometry: Geometry) {
        if (geometry === undefined) geometry = new PlaneGeometry();

        const width = 1;
        const height = 1;
        const widthSegments = 1;
        const heightSegments = 1;
        const widthHalf = width / 2;
        const heightHalf = height / 2;
        const widthDivider = width / widthSegments;
        const heightDivider = height / heightSegments;

        const positions = [] as number[];
        const normals = [] as number[];
        const uvs = [] as number[];
        const indices = [] as number[];

        let counter = 0;

        for (let i = 0; i <= widthSegments; i++) {
            for (let j = 0; j <= heightSegments; j++) {
                let x = -widthHalf + widthDivider * i;
                let y = 0;
                let z = -heightHalf + heightDivider * j;
                let u = i / widthSegments;
                let v = 1 - j / heightSegments;

                positions.push(x, y, z);
                normals.push(0, 1, 0);
                uvs.push(u, v);

                if ((i < widthSegments) && (j < heightSegments)) {
                    let a = counter;
                    let b = counter + 1;
                    let c = counter + heightSegments + 1;
                    let d = counter + heightSegments + 2;
                    indices.push(c, b, a);
                    indices.push(c, d, b);
                }

                counter++;
            }
        }

        geometry.addAttribute(
            Geometry.ATTRIBUTE_POSITION,
            new VertexBuffer(new Float32Array(positions), 3)
        );
        geometry.addAttribute(
            Geometry.ATTRIBUTE_NORMAL,
            new VertexBuffer(new Float32Array(normals), 3)
        );
        geometry.addAttribute(
            Geometry.ATTRIBUTE_TEXCOORD_0,
            new VertexBuffer(new Float32Array(uvs), 2)
        );
        geometry.primitive = new Primitive(
            Primitive.TRIANGLES,
            new IndexBuffer(new Uint8Array(indices))
        );

        return geometry;
    }

    constructor() {
        super();
        PlaneGeometry.create(this);
    }
}
