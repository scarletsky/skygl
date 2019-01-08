import Mat from "./mat";
import Mat3 from "./mat3";
import Vec3 from "./vec3";
import Vec4 from "./vec4";
import Quat from "./quat";
import { RAD_TO_DEG, DEG_TO_RAD } from "./math";

export default class Mat4 extends Mat {
    public static readonly IDENTITY = new Mat4();
    public static readonly ZERO = new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    constructor(v0?: number[]);
    constructor(
        v0: number,
        v1: number,
        v2: number,
        v3: number,
        v4: number,
        v5: number,
        v6: number,
        v7: number,
        v8: number,
        v9: number,
        v10: number,
        v11: number,
        v12: number,
        v13: number,
        v14: number,
        v15: number);

    constructor(
        v0?: number[] | number,
        v1?: number,
        v2?: number,
        v3?: number,
        v4?: number,
        v5?: number,
        v6?: number,
        v7?: number,
        v8?: number,
        v9?: number,
        v10?: number,
        v11?: number,
        v12?: number,
        v13?: number,
        v14?: number,
        v15?: number) {
        super();

        this.data = new Float32Array(16);

        if (Array.isArray(v0)) {
            this.data.set(v0);
        } else if (arguments.length === 16) {
            this.data[0] = v0;
            this.data[1] = v1;
            this.data[2] = v2;
            this.data[3] = v3;
            this.data[4] = v4;
            this.data[5] = v5;
            this.data[6] = v6;
            this.data[7] = v7;
            this.data[8] = v8;
            this.data[9] = v9;
            this.data[10] = v10;
            this.data[11] = v11;
            this.data[12] = v12;
            this.data[13] = v13;
            this.data[14] = v14;
            this.data[15] = v15;
        } else {
            this.setIdentity();
        }
    }

    public add(b: Mat4): Mat4 {
        return this.add2(this, b);
    }

    public add2(a: Mat4, b: Mat4): Mat4 {
        this.data[0] = a.data[0] + b.data[0];
        this.data[1] = a.data[1] + b.data[1];
        this.data[2] = a.data[2] + b.data[2];
        this.data[3] = a.data[3] + b.data[3];
        this.data[4] = a.data[4] + b.data[4];
        this.data[5] = a.data[5] + b.data[5];
        this.data[6] = a.data[6] + b.data[6];
        this.data[7] = a.data[7] + b.data[7];
        this.data[8] = a.data[8] + b.data[8];
        this.data[9] = a.data[9] + b.data[9];
        this.data[10] = a.data[10] + b.data[10];
        this.data[11] = a.data[11] + b.data[11];
        this.data[12] = a.data[12] + b.data[12];
        this.data[13] = a.data[13] + b.data[13];
        this.data[14] = a.data[14] + b.data[14];
        this.data[15] = a.data[15] + b.data[15];

        return this;
    }

    public clone(): Mat4 {
        return new Mat4().copy(this);
    }

    public copy(b: Mat4): Mat4 {
        this.data[0] = b.data[0];
        this.data[1] = b.data[1];
        this.data[2] = b.data[2];
        this.data[3] = b.data[3];
        this.data[4] = b.data[4];
        this.data[5] = b.data[5];
        this.data[6] = b.data[6];
        this.data[7] = b.data[7];
        this.data[8] = b.data[8];
        this.data[9] = b.data[9];
        this.data[10] = b.data[10];
        this.data[11] = b.data[11];
        this.data[12] = b.data[12];
        this.data[13] = b.data[13];
        this.data[14] = b.data[14];
        this.data[15] = b.data[15];

        return this;
    }

    public equals(b: Mat4): boolean {
        return (
            (this.data[0] === b.data[0]) &&
            (this.data[1] === b.data[1]) &&
            (this.data[2] === b.data[2]) &&
            (this.data[3] === b.data[3]) &&
            (this.data[4] === b.data[4]) &&
            (this.data[5] === b.data[5]) &&
            (this.data[6] === b.data[6]) &&
            (this.data[7] === b.data[7]) &&
            (this.data[8] === b.data[8]) &&
            (this.data[9] === b.data[9]) &&
            (this.data[10] === b.data[10]) &&
            (this.data[11] === b.data[11]) &&
            (this.data[12] === b.data[12]) &&
            (this.data[13] === b.data[13]) &&
            (this.data[14] === b.data[14]) &&
            (this.data[15] === b.data[15]));
    }

    public isIdentity(): boolean {
        return (
            (this.data[0] === 1) &&
            (this.data[1] === 0) &&
            (this.data[2] === 0) &&
            (this.data[3] === 0) &&
            (this.data[4] === 0) &&
            (this.data[5] === 1) &&
            (this.data[6] === 0) &&
            (this.data[7] === 0) &&
            (this.data[8] === 0) &&
            (this.data[9] === 0) &&
            (this.data[10] === 1) &&
            (this.data[11] === 0) &&
            (this.data[12] === 0) &&
            (this.data[13] === 0) &&
            (this.data[14] === 0) &&
            (this.data[15] === 1));
    }

    public mul(b: Mat4): Mat4 {
        return this.mul2(this, b);
    }

    public mul2(a: Mat4, b: Mat4) {
        let a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33,
            b0, b1, b2, b3;

        a00 = a.data[0];
        a01 = a.data[1];
        a02 = a.data[2];
        a03 = a.data[3];
        a10 = a.data[4];
        a11 = a.data[5];
        a12 = a.data[6];
        a13 = a.data[7];
        a20 = a.data[8];
        a21 = a.data[9];
        a22 = a.data[10];
        a23 = a.data[11];
        a30 = a.data[12];
        a31 = a.data[13];
        a32 = a.data[14];
        a33 = a.data[15];

        b0 = b.data[0];
        b1 = b.data[1];
        b2 = b.data[2];
        b3 = b.data[3];
        this.data[0] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        this.data[1] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        this.data[2] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        this.data[3] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        b0 = b.data[4];
        b1 = b.data[5];
        b2 = b.data[6];
        b3 = b.data[7];
        this.data[4] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        this.data[5] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        this.data[6] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        this.data[7] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        b0 = b.data[8];
        b1 = b.data[9];
        b2 = b.data[10];
        b3 = b.data[11];
        this.data[8] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        this.data[9] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        this.data[10] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        this.data[11] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        b0 = b.data[12];
        b1 = b.data[13];
        b2 = b.data[14];
        b3 = b.data[15];
        this.data[12] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        this.data[13] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        this.data[14] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        this.data[15] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        return this;
    }

    public transformPoint(vec: Vec3, res?: Vec3): Vec3 {
        let x, y, z, m;

        m = this.data;

        x = vec.x;
        y = vec.y;
        z = vec.z;

        res = (res === undefined) ? new Vec3() : res;

        res.x = x * m[0] + y * m[4] + z * m[8] + m[12];
        res.y = x * m[1] + y * m[5] + z * m[9] + m[13];
        res.z = x * m[2] + y * m[6] + z * m[10] + m[14];

        return res;
    }

    public transformVector(vec: Vec3, res?: Vec3): Vec3 {
        let x, y, z, m;

        m = this.data;

        x = vec.x;
        y = vec.y;
        z = vec.z;

        res = (res === undefined) ? new Vec3() : res;

        res.x = x * m[0] + y * m[4] + z * m[8];
        res.y = x * m[1] + y * m[5] + z * m[9];
        res.z = x * m[2] + y * m[6] + z * m[10];

        return res;
    }

    public transformVec4(vec: Vec4, res?: Vec4): Vec4 {
        let x, y, z, w, m;

        m = this.data;

        x = vec.x;
        y = vec.y;
        z = vec.z;
        w = vec.w;

        res = (res === undefined) ? new Vec4() : res;

        res.x = x * m[0] + y * m[4] + z * m[8] + w * m[12];
        res.y = x * m[1] + y * m[5] + z * m[9] + w * m[13];
        res.z = x * m[2] + y * m[6] + z * m[10] + w * m[14];
        res.w = x * m[3] + y * m[7] + z * m[11] + w * m[15];

        return res;
    }

    public setLookAt(position: Vec3, target: Vec3, up: Vec3): Mat4 {
        const x = new Vec3();
        const y = new Vec3();
        const z = new Vec3();

        z.sub2(position, target).normalize();
        y.copy(up).normalize();
        x.cross(y, z).normalize();
        y.cross(z, x);

        this.data[0] = x.x;
        this.data[1] = x.y;
        this.data[2] = x.z;
        this.data[3] = 0;
        this.data[4] = y.x;
        this.data[5] = y.y;
        this.data[6] = y.z;
        this.data[7] = 0;
        this.data[8] = z.x;
        this.data[9] = z.y;
        this.data[10] = z.z;
        this.data[11] = 0;
        this.data[12] = position.x;
        this.data[13] = position.y;
        this.data[14] = position.z;
        this.data[15] = 1;

        return this;
    }

    public setFrustum(left: number, right: number, bottom: number, top: number, znear: number, zfar: number): Mat4 {
        let temp1, temp2, temp3, temp4;

        temp1 = 2 * znear;
        temp2 = right - left;
        temp3 = top - bottom;
        temp4 = zfar - znear;

        this.data[0] = temp1 / temp2;
        this.data[1] = 0;
        this.data[2] = 0;
        this.data[3] = 0;
        this.data[4] = 0;
        this.data[5] = temp1 / temp3;
        this.data[6] = 0;
        this.data[7] = 0;
        this.data[8] = (right + left) / temp2;
        this.data[9] = (top + bottom) / temp3;
        this.data[10] = (-zfar - znear) / temp4;
        this.data[11] = -1;
        this.data[12] = 0;
        this.data[13] = 0;
        this.data[14] = (-temp1 * zfar) / temp4;
        this.data[15] = 0;

        return this;
    }

    public setPerspective(fovy: number, aspect: number, znear: number, zfar: number): Mat4 {
        let nf;
        const f = 1.0 / Math.tan(fovy / 2);

        this.data[0] = f / aspect;
        this.data[1] = 0;
        this.data[2] = 0;
        this.data[3] = 0;
        this.data[4] = 0;
        this.data[5] = f;
        this.data[6] = 0;
        this.data[7] = 0;
        this.data[8] = 0;
        this.data[9] = 0;
        this.data[11] = -1;
        this.data[12] = 0;
        this.data[13] = 0;
        this.data[15] = 0;
        if (zfar != null && zfar !== Infinity) {
            nf = 1 / (znear - zfar);
            this.data[10] = (zfar + znear) * nf;
            this.data[14] = (2 * zfar * znear) * nf;
        } else {
            this.data[10] = -1;
            this.data[14] = -2 * znear;
        }
        return this;
    }

    public setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
        this.data[0] = 2 / (right - left);
        this.data[1] = 0;
        this.data[2] = 0;
        this.data[3] = 0;
        this.data[4] = 0;
        this.data[5] = 2 / (top - bottom);
        this.data[6] = 0;
        this.data[7] = 0;
        this.data[8] = 0;
        this.data[9] = 0;
        this.data[10] = -2 / (far - near);
        this.data[11] = 0;
        this.data[12] = -(right + left) / (right - left);
        this.data[13] = -(top + bottom) / (top - bottom);
        this.data[14] = -(far + near) / (far - near);
        this.data[15] = 1;

        return this;
    }

    public setFromAxisAngle(axis: Vec3, angle: number): Mat4 {
        let x, y, z, c, s, t, tx, ty;

        angle *= DEG_TO_RAD;

        x = axis.x;
        y = axis.y;
        z = axis.z;
        c = Math.cos(angle);
        s = Math.sin(angle);
        t = 1 - c;
        tx = t * x;
        ty = t * y;

        this.data[0] = tx * x + c;
        this.data[1] = tx * y + s * z;
        this.data[2] = tx * z - s * y;
        this.data[3] = 0;
        this.data[4] = tx * y - s * z;
        this.data[5] = ty * y + c;
        this.data[6] = ty * z + s * x;
        this.data[7] = 0;
        this.data[8] = tx * z + s * y;
        this.data[9] = ty * z - x * s;
        this.data[10] = t * z * z + c;
        this.data[11] = 0;
        this.data[12] = 0;
        this.data[13] = 0;
        this.data[14] = 0;
        this.data[15] = 1;

        return this;
    }

    public setTranslate(tx: number, ty: number, tz: number): Mat4 {
        const m = this.data;

        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = tx;
        m[13] = ty;
        m[14] = tz;
        m[15] = 1;

        return this;
    }

    public setScale(sx: number, sy: number, sz: number): Mat4 {
        const m = this.data;

        m[0] = sx;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = sy;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = sz;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    }

    public invert(): Mat4 {
        let a00, a01, a02, a03,
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33,
            b00, b01, b02, b03,
            b04, b05, b06, b07,
            b08, b09, b10, b11,
            det, invDet, m;

        m = this.data;
        a00 = m[0];
        a01 = m[1];
        a02 = m[2];
        a03 = m[3];
        a10 = m[4];
        a11 = m[5];
        a12 = m[6];
        a13 = m[7];
        a20 = m[8];
        a21 = m[9];
        a22 = m[10];
        a23 = m[11];
        a30 = m[12];
        a31 = m[13];
        a32 = m[14];
        a33 = m[15];

        b00 = a00 * a11 - a01 * a10;
        b01 = a00 * a12 - a02 * a10;
        b02 = a00 * a13 - a03 * a10;
        b03 = a01 * a12 - a02 * a11;
        b04 = a01 * a13 - a03 * a11;
        b05 = a02 * a13 - a03 * a12;
        b06 = a20 * a31 - a21 * a30;
        b07 = a20 * a32 - a22 * a30;
        b08 = a20 * a33 - a23 * a30;
        b09 = a21 * a32 - a22 * a31;
        b10 = a21 * a33 - a23 * a31;
        b11 = a22 * a33 - a23 * a32;

        det = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
        if (det === 0) {
            // #ifdef DEBUG
            console.warn("Can't invert matrix, determinant is 0");
            // #endif
            this.setIdentity();
        } else {
            invDet = 1 / det;

            m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
            m[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
            m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
            m[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
            m[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
            m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
            m[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
            m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
            m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
            m[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
            m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
            m[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
            m[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
            m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
            m[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
            m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
        }

        return this;
    }

    public set(b: number[]): Mat4 {
        const m = this.data;
        m[0] = b[0];
        m[1] = b[1];
        m[2] = b[2];
        m[3] = b[3];
        m[4] = b[4];
        m[5] = b[5];
        m[6] = b[6];
        m[7] = b[7];
        m[8] = b[8];
        m[9] = b[9];
        m[10] = b[10];
        m[11] = b[11];
        m[12] = b[12];
        m[13] = b[13];
        m[14] = b[14];
        m[15] = b[15];

        return this;
    }

    public setIdentity() {
        const m = this.data;

        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    }

    public setTRS(t: Vec3, r: Quat, s: Vec3): Mat4 {
        let tx, ty, tz, qx, qy, qz, qw, sx, sy, sz,
            x2, y2, z2, xx, xy, xz, yy, yz, zz, wx, wy, wz, m;

        tx = t.x;
        ty = t.y;
        tz = t.z;

        qx = r.x;
        qy = r.y;
        qz = r.z;
        qw = r.w;

        sx = s.x;
        sy = s.y;
        sz = s.z;

        x2 = qx + qx;
        y2 = qy + qy;
        z2 = qz + qz;
        xx = qx * x2;
        xy = qx * y2;
        xz = qx * z2;
        yy = qy * y2;
        yz = qy * z2;
        zz = qz * z2;
        wx = qw * x2;
        wy = qw * y2;
        wz = qw * z2;

        m = this.data;

        m[0] = (1 - (yy + zz)) * sx;
        m[1] = (xy + wz) * sx;
        m[2] = (xz - wy) * sx;
        m[3] = 0;

        m[4] = (xy - wz) * sy;
        m[5] = (1 - (xx + zz)) * sy;
        m[6] = (yz + wx) * sy;
        m[7] = 0;

        m[8] = (xz + wy) * sz;
        m[9] = (yz - wx) * sz;
        m[10] = (1 - (xx + yy)) * sz;
        m[11] = 0;

        m[12] = tx;
        m[13] = ty;
        m[14] = tz;
        m[15] = 1;

        return this;
    }

    public transpose() {
        let tmp;
        const m = this.data;

        tmp = m[1];
        m[1] = m[4];
        m[4] = tmp;

        tmp = m[2];
        m[2] = m[8];
        m[8] = tmp;

        tmp = m[3];
        m[3] = m[12];
        m[12] = tmp;

        tmp = m[6];
        m[6] = m[9];
        m[9] = tmp;

        tmp = m[7];
        m[7] = m[13];
        m[13] = tmp;

        tmp = m[11];
        m[11] = m[14];
        m[14] = tmp;

        return this;
    }

    public invertTo3x3(res?: Mat3): Mat3 {
        let a11, a21, a31, a12, a22, a32, a13, a23, a33,
            m, r, det, idet;

        m = this.data;
        r = res.data;

        const m0 = m[0];
        const m1 = m[1];
        const m2 = m[2];
        // const m3 = m[3];
        const m4 = m[4];
        const m5 = m[5];
        const m6 = m[6];
        // const m7 = m[7];
        const m8 = m[8];
        const m9 = m[9];
        const m10 = m[10];

        a11 = m10 * m5 - m6 * m9;
        a21 = -m10 * m1 + m2 * m9;
        a31 = m6 * m1 - m2 * m5;
        a12 = -m10 * m4 + m6 * m8;
        a22 = m10 * m0 - m2 * m8;
        a32 = -m6 * m0 + m2 * m4;
        a13 = m9 * m4 - m5 * m8;
        a23 = -m9 * m0 + m1 * m8;
        a33 = m5 * m0 - m1 * m4;

        det = m0 * a11 + m1 * a12 + m2 * a13;
        if (det === 0) { // no inverse
            console.warn("pc.Mat4#invertTo3x3: Matrix not invertible");
            return res;
        }

        idet = 1 / det;

        r[0] = idet * a11;
        r[1] = idet * a21;
        r[2] = idet * a31;
        r[3] = idet * a12;
        r[4] = idet * a22;
        r[5] = idet * a32;
        r[6] = idet * a13;
        r[7] = idet * a23;
        r[8] = idet * a33;

        return res;
    }

    public getTranslation(t?: Vec3): Vec3 {
        t = (t === undefined) ? new Vec3() : t;

        return t.set(this.data[12], this.data[13], this.data[14]);
    }

    public getX(x?: Vec3): Vec3 {
        x = (x === undefined) ? new Vec3() : x;

        return x.set(this.data[0], this.data[1], this.data[2]);
    }

    public getY(y?: Vec3): Vec3 {
        y = (y === undefined) ? new Vec3() : y;

        return y.set(this.data[4], this.data[5], this.data[6]);
    }

    public getZ(z?: Vec3): Vec3 {
        z = (z === undefined) ? new Vec3() : z;

        return z.set(this.data[8], this.data[9], this.data[10]);
    }

    public getScale(scale?: Vec3): Vec3 {
        let x, y, z;

        x = new Vec3();
        y = new Vec3();
        z = new Vec3();

        scale = (scale === undefined) ? new Vec3() : scale;

        this.getX(x);
        this.getY(y);
        this.getZ(z);
        scale.set(x.length(), y.length(), z.length());

        return scale;
    }

    public setFromEulerAngles(ex: number, ey: number, ez: number): Mat4 {
        let s1, c1, s2, c2, s3, c3, m;

        ex *= DEG_TO_RAD;
        ey *= DEG_TO_RAD;
        ez *= DEG_TO_RAD;

        // Solution taken from http://en.wikipedia.org/wiki/Euler_angles#Matrix_orientation
        s1 = Math.sin(-ex);
        c1 = Math.cos(-ex);
        s2 = Math.sin(-ey);
        c2 = Math.cos(-ey);
        s3 = Math.sin(-ez);
        c3 = Math.cos(-ez);

        m = this.data;

        // Set rotation elements
        m[0] = c2 * c3;
        m[1] = -c2 * s3;
        m[2] = s2;
        m[3] = 0;

        m[4] = c1 * s3 + c3 * s1 * s2;
        m[5] = c1 * c3 - s1 * s2 * s3;
        m[6] = -c2 * s1;
        m[7] = 0;

        m[8] = s1 * s3 - c1 * c3 * s2;
        m[9] = c3 * s1 + c1 * s2 * s3;
        m[10] = c1 * c2;
        m[11] = 0;

        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    }

    public getEulerAngles(eulers?: Vec3): Vec3 {
        let x, y, z, sx, sy, sz, m, halfPi;
        const scale = new Vec3();

        eulers = (eulers === undefined) ? new Vec3() : eulers;

        this.getScale(scale);
        sx = scale.x;
        sy = scale.y;
        sz = scale.z;

        m = this.data;

        y = Math.asin(-m[2] / sx);
        halfPi = Math.PI * 0.5;

        if (y < halfPi) {
            if (y > -halfPi) {
                x = Math.atan2(m[6] / sy, m[10] / sz);
                z = Math.atan2(m[1] / sx, m[0] / sx);
            } else {
                // Not a unique solution
                z = 0;
                x = -Math.atan2(m[4] / sy, m[5] / sy);
            }
        } else {
            // Not a unique solution
            z = 0;
            x = Math.atan2(m[4] / sy, m[5] / sy);
        }

        return eulers.set(x, y, z).scale(RAD_TO_DEG);
    }
}
