import { Vec3 } from './Vec3';
import { Quat } from './Quat'

const x = new Vec3();
const y = new Vec3();
const z = new Vec3();

export type Mat4Data = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
];

export class Mat4 {
    public data: Mat4Data;

    static IDENTITY = Object.freeze(new Mat4());

    static create() {
        return new Mat4();
    }

    constructor() {
        this.data = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }

    set(b: Mat4Data) {
        for (let i = 0; i < b.length; i++) {
            this.data[i] = b[i];
        }

        return this;
    }

    copy(b: Mat4) {
        this.set(b.data);

        return this;
    }

    clone() {
        return new Mat4().copy(this);
    }

    add(b: Mat4) {
        return this.add2(this, b);
    }

    add2(a: Mat4, b: Mat4) {
        const data = this.data;
        const data1 = a.data;
        const data2 = b.data;

        data[0] = data1[0] + data2[0];
        data[1] = data1[1] + data2[1];
        data[2] = data1[2] + data2[2];
        data[3] = data1[3] + data2[3];
        data[4] = data1[4] + data2[4];
        data[5] = data1[5] + data2[5];
        data[6] = data1[6] + data2[6];
        data[7] = data1[7] + data2[7];
        data[8] = data1[8] + data2[8];
        data[9] = data1[9] + data2[9];
        data[10] = data1[10] + data2[10];
        data[11] = data1[11] + data2[11];
        data[12] = data1[12] + data2[12];
        data[13] = data1[13] + data2[13];
        data[14] = data1[14] + data2[14];
        data[15] = data1[15] + data2[15];

        return this;
    }

    mul(b: Mat4) {
        return this.mul2(this, b);
    }

    mul2(a: Mat4, b: Mat4) {
        const data = this.data;
        const data1 = a.data;
        const data2 = b.data;

        const a11 = data1[0], a12 = data1[4], a13 = data1[8], a14 = data1[12];
        const a21 = data1[1], a22 = data1[5], a23 = data1[9], a24 = data1[13];
        const a31 = data1[2], a32 = data1[6], a33 = data1[10], a34 = data1[14];
        const a41 = data1[3], a42 = data1[7], a43 = data1[11], a44 = data1[15];

        const b11 = data2[0], b12 = data2[4], b13 = data2[8], b14 = data2[12];
        const b21 = data2[1], b22 = data2[5], b23 = data2[9], b24 = data2[13];
        const b31 = data2[2], b32 = data2[6], b33 = data2[10], b34 = data2[14];
        const b41 = data2[3], b42 = data2[7], b43 = data2[11], b44 = data2[15];

        data[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        data[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        data[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        data[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        data[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        data[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        data[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        data[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        data[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        data[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        data[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        data[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        data[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        data[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        data[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        data[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return this;
    }

    transpose() {
        const data = this.data;

        let tmp;

        tmp = data[1]; data[1] = data[4]; data[4] = tmp;
        tmp = data[2]; data[2] = data[8]; data[8] = tmp;
        tmp = data[6]; data[6] = data[9]; data[9] = tmp;

        tmp = data[3]; data[3] = data[12]; data[12] = tmp;
        tmp = data[7]; data[7] = data[13]; data[13] = tmp;
        tmp = data[11]; data[11] = data[14]; data[14] = tmp;

        return this;
    }

    invert() {
        const data = this.data,

        n11 = data[0], n21 = data[1], n31 = data[2], n41 = data[3],
        n12 = data[4], n22 = data[5], n32 = data[6], n42 = data[7],
        n13 = data[8], n23 = data[9], n33 = data[10], n43 = data[11],
        n14 = data[12], n24 = data[13], n34 = data[14], n44 = data[15],

        t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
        t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
        t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
        t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

        const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

        if (det === 0) return this.set([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

        const detInv = 1 / det;

        data[0] = t11 * detInv;
        data[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
        data[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
        data[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;

        data[4] = t12 * detInv;
        data[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
        data[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
        data[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;

        data[8] = t13 * detInv;
        data[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
        data[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
        data[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;

        data[12] = t14 * detInv;
        data[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
        data[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
        data[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;

        return this;
    }

    setIdentity() {
        const data = this.data;

        data[0] = 1;
        data[1] = 0;
        data[2] = 0;
        data[3] = 0;

        data[4] = 0;
        data[5] = 1;
        data[6] = 0;
        data[7] = 0;

        data[8] = 0;
        data[9] = 0;
        data[10] = 1;
        data[11] = 0;

        data[12] = 0;
        data[13] = 0;
        data[14] = 0;
        data[15] = 1;

        return this;
    }

    setPerspective(fovy: number, aspect: number, near: number, far: number) {
        const data = this.data;
        const f = 1.0 / Math.tan(fovy / 2);

        data[0] = f / aspect;
        data[1] = 0;
        data[2] = 0;
        data[3] = 0;
        data[4] = 0;
        data[5] = f;
        data[6] = 0;
        data[7] = 0;
        data[8] = 0;
        data[9] = 0;
        data[11] = -1;
        data[12] = 0;
        data[13] = 0;
        data[15] = 0;

        if (far !== Infinity) {
            const nf = 1 / (near - far);
            data[10] = (far + near) * nf;
            data[14] = 2 * far * near * nf;
        } else {
            data[10] = -1;
            data[14] = -2 * near;
        }

        return this;
    }

    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        const data = this.data;
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);

        data[0] = -2 * lr;
        data[1] = 0;
        data[2] = 0;
        data[3] = 0;
        data[4] = 0;
        data[5] = -2 * bt;
        data[6] = 0;
        data[7] = 0;
        data[8] = 0;
        data[9] = 0;
        data[10] = 2 * nf;
        data[11] = 0;
        data[12] = (left + right) * lr;
        data[13] = (top + bottom) * bt;
        data[14] = (far + near) * nf;
        data[15] = 1;

        return this;
    }

    setLookAt(position: Vec3, target: Vec3, up: Vec3) {
        z.sub2(position, target).normalize();
        y.copy(up).normalize();
        x.cross2(y, z).normalize();
        y.cross2(z, x);

        var r = this.data;

        r[0]  = x.x;
        r[1]  = x.y;
        r[2]  = x.z;
        r[3]  = 0;
        r[4]  = y.x;
        r[5]  = y.y;
        r[6]  = y.z;
        r[7]  = 0;
        r[8]  = z.x;
        r[9]  = z.y;
        r[10] = z.z;
        r[11] = 0;
        r[12] = position.x;
        r[13] = position.y;
        r[14] = position.z;
        r[15] = 1;

        return this;
    }

    getX(res = new Vec3()) {
        const data = this.data;
        res.set(data[0], data[1], data[2]);

        return res;
    }

    getY(res = new Vec3()) {
        const data = this.data;
        res.set(data[4], data[5], data[6]);

        return res;
    }

    getZ(res = new Vec3()) {
        const data = this.data;
        res.set(data[8], data[9], data[10]);

        return res;
    }

    getTranslation(res = new Vec3()) {
        const data = this.data;
        res.set(data[12], data[13], data[14]);

        return res;
    }

    getRotation(res = new Quat()) {
        const data = this.data;
        const scale = this.getScale(x);

        const is1 = 1 / scale.x;
        const is2 = 1 / scale.y;
        const is3 = 1 / scale.z;

        const sm11 = data[0] * is1;
        const sm12 = data[1] * is2;
        const sm13 = data[2] * is3;
        const sm21 = data[4] * is1;
        const sm22 = data[5] * is2;
        const sm23 = data[6] * is3;
        const sm31 = data[8] * is1;
        const sm32 = data[9] * is2;
        const sm33 = data[10] * is3;

        const trace = sm11 + sm22 + sm33;
        let S = 0;

        if (trace > 0) {
            S = Math.sqrt(trace + 1.0) * 2;
            res.set(
                (sm23 - sm32) / S,
                (sm31 - sm13) / S,
                (sm12 - sm21) / S,
                0.25 * S
            );
        } else if (sm11 > sm22 && sm11 > sm33) {
            S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
            res.set(
                0.25 * S,
                (sm12 + sm21) / S,
                (sm31 + sm13) / S,
                (sm23 - sm32) / S
            );
        } else if (sm22 > sm33) {
            S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
            res.set(
                (sm12 + sm21) / S,
                0.25 * S,
                (sm23 + sm32) / S,
                (sm31 - sm13) / S
            );
        } else {
            S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
            res.set(
                (sm31 + sm13) / S,
                (sm23 + sm32) / S,
                0.25 * S,
                (sm12 - sm21) / S
            );
        }

        return res;
    }

    getScale(res = new Vec3()) {

        const data = this.data;
        const m11 = data[0];
        const m12 = data[1];
        const m13 = data[2];
        const m21 = data[4];
        const m22 = data[5];
        const m23 = data[6];
        const m31 = data[8];
        const m32 = data[9];
        const m33 = data[10];

        res.set(
            Math.hypot(m11, m12, m13),
            Math.hypot(m21, m22, m23),
            Math.hypot(m31, m32, m33)
        );

        return res;
    }

    getTRS(translation = new Vec3(), rotation = new Quat(), scale = new Vec3()) {
        const data = this.data;
        translation.set(data[12], data[13], data[14]);

        let m11 = data[0];
        let m12 = data[1];
        let m13 = data[2];
        let m21 = data[4];
        let m22 = data[5];
        let m23 = data[6];
        let m31 = data[8];
        let m32 = data[9];
        let m33 = data[10];

        scale.set(
            Math.hypot(m11, m12, m13),
            Math.hypot(m21, m22, m23),
            Math.hypot(m31, m32, m33)
        );

        let is1 = 1 / scale.x;
        let is2 = 1 / scale.y;
        let is3 = 1 / scale.z;

        let sm11 = m11 * is1;
        let sm12 = m12 * is2;
        let sm13 = m13 * is3;
        let sm21 = m21 * is1;
        let sm22 = m22 * is2;
        let sm23 = m23 * is3;
        let sm31 = m31 * is1;
        let sm32 = m32 * is2;
        let sm33 = m33 * is3;

        let trace = sm11 + sm22 + sm33;
        let S = 0;

        if (trace > 0) {
            S = Math.sqrt(trace + 1.0) * 2;
            rotation.set(
                (sm23 - sm32) / S,
                (sm31 - sm13) / S,
                (sm12 - sm21) / S,
                0.25 * S
            );
        } else if (sm11 > sm22 && sm11 > sm33) {
            S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
            rotation.set(
                0.25 * S,
                (sm12 + sm21) / S,
                (sm31 + sm13) / S,
                (sm23 - sm32) / S
            );
        } else if (sm22 > sm33) {
            S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
            rotation.set(
                (sm12 + sm21) / S,
                0.25 * S,
                (sm23 + sm32) / S,
                (sm31 - sm13) / S
            );
        } else {
            S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
            rotation.set(
                (sm31 + sm13) / S,
                (sm23 + sm32) / S,
                0.25 * S,
                (sm12 - sm21) / S
            );
        }

        return rotation;
    }

    setTRS(translation: Vec3, rotation: Quat, scale: Vec3) {
        let x = rotation.x,
            y = rotation.y,
            z = rotation.z,
            w = rotation.w;
        let x2 = x + x;
        let y2 = y + y;
        let z2 = z + z;

        let xx = x * x2;
        let xy = x * y2;
        let xz = x * z2;
        let yy = y * y2;
        let yz = y * z2;
        let zz = z * z2;
        let wx = w * x2;
        let wy = w * y2;
        let wz = w * z2;
        let sx = scale.x;
        let sy = scale.y;
        let sz = scale.z;

        const data = this.data;

        data[0] = (1 - (yy + zz)) * sx;
        data[1] = (xy + wz) * sx;
        data[2] = (xz - wy) * sx;
        data[3] = 0;
        data[4] = (xy - wz) * sy;
        data[5] = (1 - (xx + zz)) * sy;
        data[6] = (yz + wx) * sy;
        data[7] = 0;
        data[8] = (xz + wy) * sz;
        data[9] = (yz - wx) * sz;
        data[10] = (1 - (xx + yy)) * sz;
        data[11] = 0;
        data[12] = translation.x;
        data[13] = translation.x;
        data[14] = translation.x;
        data[15] = 1;

        return this;
    }

    toJSON() {
        const data = this.data;
        return [
            data[0], data[1], data[2], data[3],
            data[4], data[5], data[6], data[7],
            data[8], data[9], data[10], data[11],
            data[12], data[13], data[14], data[15]
        ];
    }
}
