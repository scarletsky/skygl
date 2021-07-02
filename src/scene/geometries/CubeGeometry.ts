import { Vec3 } from 'math/Vec3';
import { VertexBuffer, VertexBufferGroup } from 'graphics/buffers';
import { IndexBuffer } from 'graphics/buffers/IndexBuffer';
import { Primitive } from 'graphics/Primitive';
import { Geometry } from './Geometry';
import { TRIANGLES, UNSIGNED_BYTE, UNSIGNED_INT, UNSIGNED_SHORT, VertexAttributeSemantic } from 'graphics';
import { isNil } from 'utils/index';

export interface CubeGeometryOptions {
    width?: number;
    height?: number;
    depth?: number;
    needsIndices?: boolean;
    needsNormals?: boolean;
    needsTexCoord0?: boolean;
}

export class CubeGeometry {
    /*
          4____7
        0/___3/|
        | 5__|_6
        1/___2/
    */
    static create(options: CubeGeometryOptions = {}) {
        const width = options.width || 1;
        const height = options.height || 1;
        const depth = options.depth || 1;
        const needsIndices = !isNil(options.needsIndices) ? options.needsIndices : true;
        const needsNormals = !isNil(options.needsNormals) ? options.needsNormals : true;
        const needsTexCoord0 = !isNil(options.needsTexCoord0) ? options.needsTexCoord0 : true;

        const positions = [] as number[];
        const normals = [] as number[];
        const indices = [] as number[];
        const texCoords = [] as number[];
        const points = [
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
            [0,  0,  1], // +z
            [0,  0, -1], // -z
            [0,  1,  0], // +y
            [0, -1,  0], // -y
            [ 1, 0,  0], // +x
            [-1, 0,  0]  // -x
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
                    vecA.lerp2(points[faceIndices[face][0]], points[faceIndices[face][1]], i / uSegments);
                    vecB.lerp2(points[faceIndices[face][0]], points[faceIndices[face][2]], j / uSegments);
                    vecC.sub2(vecB, points[faceIndices[face][0]]);
                    vecD.add2(vecA, vecC);
                    u = i / uSegments;
                    v = j / vSegments;

                    positions.push(vecD.x, vecD.y, vecD.z);

                    if (needsNormals) {
                        normals.push(faceNormals[face][0], faceNormals[face][1], faceNormals[face][2]);
                    }

                    if (needsTexCoord0) {
                        texCoords.push(u, v);
                    }

                    if (needsIndices && (i < uSegments) && (j < vSegments)) {
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

        const geometry = new Geometry();
        const vertices = new VertexBufferGroup();
        vertices.add(new VertexBuffer({
            buffer: { srcData: new Float32Array(positions) },
            attribute: { semantic: VertexAttributeSemantic.POSITION }
        }))

        if (needsNormals) {
            vertices.add(new VertexBuffer({
                buffer: { srcData: new Float32Array(normals) },
                attribute: { semantic: VertexAttributeSemantic.NORMAL }
            }));
        }

        if (needsTexCoord0) {
            vertices.add(new VertexBuffer({
                buffer: { srcData: new Float32Array(texCoords) },
                attribute: { semantic: VertexAttributeSemantic.TEXCOORD_0 }
            }));
        }

        geometry.addVertices(vertices);

        if (needsIndices) {
            let Ctor, type;
            let len = positions.length / 3;

            if (len < 256) {
                Ctor = Uint8Array;
                type = UNSIGNED_BYTE
            } else if (len < 65536) {
                Ctor = Uint16Array;
                type = UNSIGNED_SHORT;
            } else {
                Ctor = Uint32Array;
                type = UNSIGNED_INT;
            }

            geometry.addIndices(new IndexBuffer({
                buffer: { srcData: new Ctor(indices) }
            }));
            geometry.addPrimitive(new Primitive({
                mode: TRIANGLES,
                count: indices.length / 3,
                type,
            }));
        } else {
            geometry.addPrimitive(new Primitive({
                mode: TRIANGLES,
                count: positions.length / 3
            }));
        }

        return geometry;
    }

    constructor(options: CubeGeometryOptions = {}) {
        return CubeGeometry.create(options);
    }
}
