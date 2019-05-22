import Vec3 from "math/vec3";
import VertexBuffer from "graphics/vertex-buffer";
import IndexBuffer from "graphics/index-buffer";
import Primitive from "graphics/primitive";
import Geometry from "./geometry";

export default class SphereGeometry extends Geometry {
    static create(geometry: Geometry) {
        if (geometry === undefined) geometry = new SphereGeometry();

        const vecA = new Vec3();
        const radius = 1;
        const divider = 1 / radius;
        const heightSegments = 16;
        const widthSegments = 16;
        const phiStart = 0;
        const phiLength = Math.PI * 2;
        const thetaStart = 0;
        const thetaLength = Math.PI;
        const len = widthSegments + 1;

        const positions = [] as number[];
        const normals = [] as number[];
        const uvs = [] as number[];
        const indices = [] as number[];

        for (let j = 0; j <= heightSegments; j ++) {
            for (let i = 0; i <= widthSegments; i ++) {
                let u = i / widthSegments;
                let v = j / heightSegments;

                // X axis is inverted so texture can be mapped from left to right
                let x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                let y = radius * Math.cos(thetaStart + v * thetaLength);
                let z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);

                positions.push(x, y, z);
                uvs.push(u, v);
                normals.push(x * divider, y * divider, z * divider);
            }
        }

        for (let j = 0; j < heightSegments; j ++) {
            for (let i = 0; i < widthSegments; i ++) {
                let i2 = j * len + i;
                let i1 = (j * len + i + 1);
                let i4 = (j + 1) * len + i + 1;
                let i3 = (j + 1) * len + i;

                indices.push(i1, i2, i4);
                indices.push(i2, i3, i4);
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
            new IndexBuffer(new Uint16Array(indices))
        );

        return geometry;
    }

    constructor() {
        super();
        SphereGeometry.create(this);
    }
}
