import { Vec2, Vec3 } from "math";
import VertexBuffer from "graphics/vertex-buffer";
import Primitive from "graphics/primitive";

export default class Geometry {
    public static readonly ATTRIBUTE_POSITION = "position";
    public static readonly ATTRIBUTE_NORMAL = "normal";
    public static readonly ATTRIBUTE_TANGENT = "tangent";
    public static readonly ATTRIBUTE_COLOR = "color";
    public static readonly ATTRIBUTE_TEXCOORD_0 = "uv0";

    public attributes: { [attribute: string]: VertexBuffer };
    public primitive: Primitive;

    constructor() {
        this.attributes = {};
        this.primitive = null;
    }

    public addAttribute(name: string, vertexBuffer: VertexBuffer) {
        this.attributes[name] = vertexBuffer;
    }

    // from http://www.terathon.com/code/tangent.html
    public calculateTangents() {
        const positions = this.attributes[Geometry.ATTRIBUTE_POSITION].data;
        const normals = this.attributes[Geometry.ATTRIBUTE_NORMAL].data;
        const uvs = this.attributes[Geometry.ATTRIBUTE_TEXCOORD_0].data;
        const indices = this.primitive.indexBuffer.data;
        const triangleCount = indices.length / 3;
        const vertexCount = positions.length / 3;

        const tan1 = new Float32Array(vertexCount * 3);
        const tan2 = new Float32Array(vertexCount * 3);
        const tangents = new Float32Array(vertexCount * 4);

        let i1, i2, i3; // for index
        let t1, t2, t3, t4, t5, t6; // for temp
        let x1, y1, z1;
        let x2, y2, z2;
        let s1, s2;
        let area, r;
        let v1 = new Vec3();
        let v2 = new Vec3();
        let v3 = new Vec3();
        let w1 = new Vec2();
        let w2 = new Vec2();
        let w3 = new Vec2();
        let sdir = new Vec3();
        let tdir = new Vec3();
        let t = new Vec3();
        let b = new Vec3();
        let n = new Vec3();

        for (let i = 0; i < triangleCount; i++) {
            t1 = i * 3;
            i1 = indices[t1];
            i2 = indices[t1 + 1];
            i3 = indices[t1 + 2];

            t1 = i1 * 3;
            t2 = i2 * 3;
            t3 = i3 * 3;

            v1.set(positions[t1], positions[t1 + 1], positions[t1 + 2]);
            v2.set(positions[t2], positions[t2 + 1], positions[t2 + 2]);
            v3.set(positions[t3], positions[t3 + 1], positions[t3 + 2]);

            t4 = i1 * 2;
            t5 = i2 * 2;
            t6 = i3 * 2;

            w1.set(uvs[t4], uvs[t4 + 1]);
            w2.set(uvs[t5], uvs[t5 + 1]);
            w3.set(uvs[t6], uvs[t6 + 1]);

            x1 = v2.x - v1.x;
            x2 = v3.x - v1.x;
            y1 = v2.y - v1.y;
            y2 = v3.y - v1.y;
            z1 = v2.z - v1.z;
            z2 = v3.z - v1.z;

            s1 = w2.x - w1.x;
            s2 = w3.x - w1.x;
            t1 = w2.y - w1.y;
            t2 = w3.y - w1.y;

            area = s1 * t2 - s2 * t1;
            r = 1 / area;
            sdir.set((t2 * x1 - t1 * x2) * r,
                     (t2 * y1 - t1 * y2) * r,
                     (t2 * z1 - t1 * z2) * r)
            tdir.set((s1 * x2 - s2 * x1) * r,
                     (s1 * y2 - s2 * y1) * r,
                     (s1 * z2 - s2 * z1) * r);

            tan1[t1]     += sdir.x;
            tan1[t1 + 1] += sdir.y;
            tan1[t1 + 2] += sdir.z;
            tan1[t2]     += sdir.x;
            tan1[t2 + 1] += sdir.y;
            tan1[t2 + 2] += sdir.z;
            tan1[t3]     += sdir.x;
            tan1[t3 + 1] += sdir.y;
            tan1[t3 + 2] += sdir.z;

            tan2[t1]     += tdir.x;
            tan2[t1 + 1] += tdir.y;
            tan2[t1 + 2] += tdir.z;
            tan2[t2]     += tdir.x;
            tan2[t2 + 1] += tdir.y;
            tan2[t2 + 2] += tdir.z;
            tan2[t3]     += tdir.x;
            tan2[t3 + 1] += tdir.y;
            tan2[t3 + 2] += tdir.z;
        }

        for (let i = 0; i < vertexCount; i++) {
            t1 = i * 3;
            t2 = t1 + 1;
            t3 = t1 + 2;

            n.set(normals[t1], normals[t2], normals[t3]);
            t.set(tan1[t1], tan1[t2], tan1[t3]);
            b.set(tan2[t1], tan2[t2], tan2[t3]);

            // Gram-Schmidt
            // T - (T . N)N
            v1.copy(n).scale(t.dot(n));
            v1.sub2(t, v1).normalize();

            t4 = i * 4;
            t5 = t4 + 1;
            t6 = t4 + 2;
            tangents[t4] = v1.x;
            tangents[t5] = v1.y;
            tangents[t6] = v1.z;

            // Calculate handedness
            v1.cross(n, t);
            tangents[t4 + 3] = (v1.dot(b) < 0) ? -1.0 : 1.0;
        }

        this.addAttribute(Geometry.ATTRIBUTE_TANGENT, new VertexBuffer(tangents, 4));
    }
}
