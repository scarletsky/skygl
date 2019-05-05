import Vec3 from "math/vec3";
import VertexBuffer from "graphics/vertex-buffer";
import IndexBuffer from "graphics/index-buffer";
import Primitive from "graphics/primitive";
import Geometry from "./geometry";

export default class SphereGeometry extends Geometry {
    static create(geometry: Geometry) {
        if (geometry === undefined) geometry = new SphereGeometry();

        const vecA = new Vec3();
        const radius = 0.5;
        const latitudeSegments = 16;
        const longitudeSegments = 16;

        const positions = [] as number[];
        const normals = [] as number[];
        const uvs = [] as number[];
        const indices = [] as number[];

        for (let i = 0; i <= latitudeSegments; i++) {
            let theta = Math.PI * i / latitudeSegments;
            let sinTheta = Math.sin(theta);
            let cosTheta = Math.cos(theta);

            for (let j = 0; j <= longitudeSegments; j++) {
                let phi = Math.PI * 2 * j / longitudeSegments;
                let sinPhi = Math.sin(phi);
                let cosPhi = Math.cos(phi);

                let x = radius * cosPhi * sinTheta;
                let y = radius * cosTheta;
                let z = radius * sinPhi * sinTheta;
                let u = 1.0 - j / longitudeSegments;
                let v = 1.0 - i / latitudeSegments;

                vecA.set(x, y, z).normalize();
                positions.push(x, y, z);
                normals.push(vecA.x, vecA.y, vecA.z);
                uvs.push(u, v);
            }
        }

        for (let i = 0; i < latitudeSegments; ++i) {
            for (let j = 0; j < longitudeSegments; ++j) {
                let first  = (i * (longitudeSegments + 1)) + j;
                let second = first + longitudeSegments + 1;

                indices.push(first + 1, second, first);
                indices.push(first + 1, second + 1, second);
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
        SphereGeometry.create(this);
    }
}
