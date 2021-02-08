import { Vec3 } from './Vec3';
import { Mat4, Mat4Data } from './Mat4';
import { EPSILON, HALF_RAD, RAD_TO_DEG } from './math';

export class Quat {
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    static IDENTITY = Object.freeze(new Quat());

    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;
    }

    set(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }

    clone() {
        return new Quat().set(this.x, this.y, this.z, this.w);
    }

    copy(b: Quat) {
        this.set(b.x, b.y, b.z, b.w);

        return this;
    }

    conjugate() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;

        return this;
    }

    invert() {
        return this.conjugate().normalize();
    }

    length() {
        return Math.hypot(this.x, this.y, this.z, this.w);
    }

    lengthSq() {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;

        return x * x + y * y + z * z + w * w;
    }

    normalize() {
        let len = this.length();
        if (len === 0) {
            this.x = this.y = this.z = 0;
            this.w = 1;
        } else {
            len = 1 / len;
            this.x *= len;
            this.y *= len;
            this.z *= len;
            this.w *= len;
        }

        return this;
    }

    mul(b: Quat) {
        return this.mul2(this, b);
    }

    mul2(a: Quat, b: Quat) {
        let q1x, q1y, q1z, q1w, q2x, q2y, q2z, q2w;

        q1x = a.x;
        q1y = a.y;
        q1z = a.z;
        q1w = a.w;

        q2x = b.x;
        q2y = b.y;
        q2z = b.z;
        q2w = b.w;

        this.x = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
        this.y = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;
        this.z = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
        this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

        return this;
    }

    setIdentity() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;

        return this;
    }

    getAxisAngle(res = new Vec3()) {
        const rad = Math.acos(this.w) * 2.0;
        const s = Math.sin(rad / 2.0);
        if (s > EPSILON) {
            res.x = this.x / s;
            res.y = this.y / s;
            res.z = this.z / s;
        } else {
            // If s is zero, return any axis (no rotation - axis does not matter)
            res.x = 1;
            res.y = 0;
            res.z = 0;
        }
        return rad;
    }

    setAxisAngle(axis: Vec3, rad: number) {
        rad = rad * 0.5;

        const s = Math.sin(rad);
        this.x = s * axis.x;
        this.y = s * axis.y;
        this.z = s * axis.z;
        this.w = Math.cos(rad);

        return this;
    }

    getEulerAngle(res = new Vec3()) {
        let x, y, z, qx, qy, qz, qw, a2;

        qx = this.x;
        qy = this.y;
        qz = this.z;
        qw = this.w;

        a2 = 2 * (qw * qy - qx * qz);
        if (a2 <= -0.99999) {
            x = 2 * Math.atan2(qx, qw);
            y = -Math.PI / 2;
            z = 0;
        } else if (a2 >= 0.99999) {
            x = 2 * Math.atan2(qx, qw);
            y = Math.PI / 2;
            z = 0;
        } else {
            x = Math.atan2(2 * (qw * qx + qy * qz), 1 - 2 * (qx * qx + qy * qy));
            y = Math.asin(a2);
            z = Math.atan2(2 * (qw * qz + qx * qy), 1 - 2 * (qy * qy + qz * qz));
        }

        return res.set(x, y, z).scale(RAD_TO_DEG);
    }

    setEulerAngle(x: Vec3 | number, y = 0, z = 0) {
        if (x instanceof Vec3) {
            y = x.y;
            z = x.z;
            x = x.x;
        }

        x *= HALF_RAD;
        z *= HALF_RAD;
        y *= HALF_RAD;

        let sx = Math.sin(x);
        let cx = Math.cos(x);
        let sy = Math.sin(y);
        let cy = Math.cos(y);
        let sz = Math.sin(z);
        let cz = Math.cos(z);

        this.x = sx * cy * cz - cx * sy * sz;
        this.y = cx * sy * cz + sx * cy * sz;
        this.z = cx * cy * sz - sx * sy * cz;
        this.w = cx * cy * cz + sx * sy * sz;

        return this;
    }

    setMat4(mat: Mat4) {
        let m00, m01, m02, m10, m11, m12, m20, m21, m22,
            tr, s, rs, lx, ly, lz;

        let m = mat.data as Mat4Data;

        // Cache matrix values for super-speed
        m00 = m[0];
        m01 = m[1];
        m02 = m[2];
        m10 = m[4];
        m11 = m[5];
        m12 = m[6];
        m20 = m[8];
        m21 = m[9];
        m22 = m[10];

        // Remove the scale from the matrix
        lx = m00 * m00 + m01 * m01 + m02 * m02;
        if (lx === 0)
            return this;
        lx = 1 / Math.sqrt(lx);
        ly = m10 * m10 + m11 * m11 + m12 * m12;
        if (ly === 0)
            return this;
        ly = 1 / Math.sqrt(ly);
        lz = m20 * m20 + m21 * m21 + m22 * m22;
        if (lz === 0)
            return this;
        lz = 1 / Math.sqrt(lz);

        m00 *= lx;
        m01 *= lx;
        m02 *= lx;
        m10 *= ly;
        m11 *= ly;
        m12 *= ly;
        m20 *= lz;
        m21 *= lz;
        m22 *= lz;

        // http://www.cs.ucr.edu/~vbz/resources/quatut.pdf

        tr = m00 + m11 + m22;
        if (tr >= 0) {
            s = Math.sqrt(tr + 1);
            this.w = s * 0.5;
            s = 0.5 / s;
            this.x = (m12 - m21) * s;
            this.y = (m20 - m02) * s;
            this.z = (m01 - m10) * s;
        } else {
            if (m00 > m11) {
                if (m00 > m22) {
                    // XDiagDomMatrix
                    rs = (m00 - (m11 + m22)) + 1;
                    rs = Math.sqrt(rs);

                    this.x = rs * 0.5;
                    rs = 0.5 / rs;
                    this.w = (m12 - m21) * rs;
                    this.y = (m01 + m10) * rs;
                    this.z = (m02 + m20) * rs;
                } else {
                    // ZDiagDomMatrix
                    rs = (m22 - (m00 + m11)) + 1;
                    rs = Math.sqrt(rs);

                    this.z = rs * 0.5;
                    rs = 0.5 / rs;
                    this.w = (m01 - m10) * rs;
                    this.x = (m20 + m02) * rs;
                    this.y = (m21 + m12) * rs;
                }
            } else if (m11 > m22) {
                // YDiagDomMatrix
                rs = (m11 - (m22 + m00)) + 1;
                rs = Math.sqrt(rs);

                this.y = rs * 0.5;
                rs = 0.5 / rs;
                this.w = (m20 - m02) * rs;
                this.z = (m12 + m21) * rs;
                this.x = (m10 + m01) * rs;
            } else {
                // ZDiagDomMatrix
                rs = (m22 - (m00 + m11)) + 1;
                rs = Math.sqrt(rs);

                this.z = rs * 0.5;
                rs = 0.5 / rs;
                this.w = (m01 - m10) * rs;
                this.x = (m20 + m02) * rs;
                this.y = (m21 + m12) * rs;
            }
        }

        return this;
    }

    equals(b: Quat) {
        const a0 = this.x;
        const a1 = this.y;
        const a2 = this.z;
        const a3 = this.w;
        const b0 = b.x;
        const b1 = b.y;
        const b2 = b.z;
        const b3 = b.w;

        return (
            Math.abs(a0 - b0) <=
            EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <=
            EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <=
            EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <=
            EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3))
        );
    }

    toJSON() {
        return [this.x, this.y, this.z, this.w];
    }
}
