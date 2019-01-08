import Vec from "./vec";

export default class Vec4 extends Vec {

    public static readonly ONE = new Vec4(1, 1, 1, 1);
    public static readonly ZERO = new Vec4(0, 0, 0, 0);

    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(x?: number[] | number, y?: number, z?: number, w?: number) {
        super();

        if (Array.isArray(x)) {
            this.x = x[0];
            this.y = x[1];
            this.z = x[2];
            this.w = x[3];
        } else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.w = w || 0;
        }
    }

    public add(rhs: Vec4) {
        this.x += rhs.x;
        this.y += rhs.y;
        this.z += rhs.z;
        this.w += rhs.w;

        return this;
    }

    public add2(lhs: Vec4, rhs: Vec4) {
        this.x = lhs.x + rhs.x;
        this.y = lhs.y + rhs.y;
        this.z = lhs.z + rhs.z;
        this.w = lhs.w + rhs.w;

        return this;
    }

    public clone() {
        return new Vec4().copy(this);
    }

    public copy(rhs: Vec4) {
        this.x = rhs.x;
        this.y = rhs.y;
        this.z = rhs.z;
        this.w = rhs.w;

        return this;
    }

    public dot(rhs: Vec4) {
        return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z + this.w * rhs.w;
    }

    public equals(rhs: Vec4) {
        return this.x === rhs.x && this.y === rhs.y && this.z === rhs.z && this.w === rhs.w;
    }

    public length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    public lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    public lerp(lhs: Vec4, rhs: Vec4, alpha: number) {
        this.x = lhs.x + alpha * (rhs.x - lhs.x);
        this.y = lhs.y + alpha * (rhs.y - lhs.y);
        this.z = lhs.z + alpha * (rhs.z - lhs.z);
        this.w = lhs.w + alpha * (rhs.w - lhs.w);

        return this;
    }

    public mul(rhs: Vec4) {
        this.x *= rhs.x;
        this.y *= rhs.y;
        this.z *= rhs.z;
        this.w *= rhs.w;

        return this;
    }

    public mul2(lhs: Vec4, rhs: Vec4) {
        this.x = lhs.x * rhs.x;
        this.y = lhs.y * rhs.y;
        this.z = lhs.z * rhs.z;
        this.w = lhs.w * rhs.w;

        return this;
    }

    public normalize() {
        const lengthSq = this.lengthSq();

        if (lengthSq > 0) {
            const invLength = 1 / Math.sqrt(lengthSq);
            this.x *= invLength;
            this.y *= invLength;
            this.z *= invLength;
            this.w *= invLength;
        }

        return this;
    }

    public scale(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;

        return this;
    }

    public set(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }

    public sub(rhs: Vec4) {
        this.x -= rhs.x;
        this.y -= rhs.y;
        this.z -= rhs.z;
        this.w -= rhs.w;

        return this;
    }

    public sub2(lhs: Vec4, rhs: Vec4) {
        this.x = lhs.x - rhs.x;
        this.y = lhs.y - rhs.y;
        this.z = lhs.z - rhs.z;
        this.w = lhs.w - rhs.w;

        return this;
    }

    public toString() {
        return `[${this.x}, ${this.y}, ${this.z}, ${this.w}]`;
    }
}
