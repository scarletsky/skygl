import Vec3 from "../math/vec3";
import Geometry from "./geometry";
import VertexBuffer from "../graphics/vertex-buffer";
import IndexBuffer from "../graphics/index-buffer";
import Primitive from "../graphics/primitive";

export function createBox() {
    const geometry = new Geometry();
    const positions = [] as number[];
    const normals = [] as number[];
    const uvs = [] as number[];
    const indices = [] as number[];

    /*

      4____7
    0/___3/|
    | 5__|_6
    1/___2/

    */
    const vertices = [
        new Vec3(-0.5,  0.5,  0.5), // 0
        new Vec3(-0.5, -0.5,  0.5), // 1
        new Vec3( 0.5, -0.5,  0.5), // 2
        new Vec3( 0.5,  0.5,  0.5), // 3
        new Vec3(-0.5,  0.5, -0.5), // 4
        new Vec3(-0.5, -0.5, -0.5), // 5
        new Vec3( 0.5, -0.5, -0.5), // 6
        new Vec3( 0.5,  0.5, -0.5), // 7
    ];
    const faceNormals = [
        [ 1, 0,  0], // +x,
        [-1, 0,  0], // -x
        [0,  1,  0], // +y
        [0, -1,  0], // -y
        [0,  0,  1], // +z
        [0,  0, -1], // -z
    ];
    const faceIndices = [
        [1, 2, 0], // +z
        [6, 5, 7], // -z
        [0, 3, 4], // +y
        [5, 6, 1], // -y
        [2, 6, 3], // +x
        [5, 1, 4]  // -x
    ];
    const faces = {
        FRONT: 0,
        BACK: 1,
        UP: 2,
        DOWN: 3,
        RIGHT: 4,
        LEFT: 5
    };

    let counter = 0;
    const vecA = new Vec3();
    const vecB = new Vec3();
    const vecC = new Vec3();
    const vecD = new Vec3();

    function generateFace(face: number, uSegments: number = 1, vSegments: number = 1) {
        let u, v;

        for (let i = 0; i <= uSegments; i++) {
            for (let j = 0; j <= vSegments; j++) {
                vecA.lerp(vertices[faceIndices[face][0]], vertices[faceIndices[face][1]], i / uSegments);
                vecB.lerp(vertices[faceIndices[face][0]], vertices[faceIndices[face][2]], j / uSegments);
                vecC.sub2(vecB, vertices[faceIndices[face][0]]);
                vecD.add2(vecA, vecC);
                u = i / uSegments;
                v = j / vSegments;

                positions.push(vecD.x, vecD.y, vecD.z);
                normals.push(faceNormals[face][0], faceNormals[face][1], faceNormals[face][2]);
                uvs.push(u, v);

                if ((i < uSegments) && (j < vSegments)) {
                    indices.push(counter + vSegments + 1, counter + 1, counter);
                    indices.push(counter + vSegments + 1, counter + vSegments + 2, counter + 1);
                }

                counter++;
            }
        }
    }

    generateFace(faces.FRONT);
    generateFace(faces.BACK);
    generateFace(faces.UP);
    generateFace(faces.DOWN);
    generateFace(faces.RIGHT);
    generateFace(faces.LEFT);

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
