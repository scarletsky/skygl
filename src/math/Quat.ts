import { Vec3 } from './Vec3';
import { EPSILON } from './math';

export class Quat {
    public x: number;
    public y: number;
    public z: number;
    public w: number;

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
        const rad = Math.acos(q[3]) * 2.0;
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

    toJSON() {
        return [this.x, this.y, this.z, this.w];
    }
}
