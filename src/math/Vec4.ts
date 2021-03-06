import { EPSILON } from './math';

export class Vec4 {
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    static ZERO = Object.freeze(new Vec4(0, 0, 0, 0));
    static ONE = Object.freeze(new Vec4(1, 1, 1, 1));

    static create() {
        return new Vec4();
    }

    static isVec4(value: any): value is Vec4 {
        return value instanceof Vec4;
    }

    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    set(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }

    add(b: Vec4) {
        this.x += b.x;
        this.y += b.y;
        this.z += b.z;
        this.w += b.w;

        return this;
    }

    add2(a: Vec4, b: Vec4) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;
        this.w = a.w + b.w;

        return this;
    }

    sub(b: Vec4) {
        this.x -= b.x;
        this.y -= b.y;
        this.z -= b.z;
        this.w -= b.w;

        return this;
    }

    sub2(a: Vec4, b: Vec4) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;
        this.w = a.w - b.w;

        return this;
    }

    mul(b: Vec4) {
        this.x *= b.x;
        this.y *= b.y;
        this.z *= b.z;
        this.w *= b.w;

        return this;
    }

    mul2(a: Vec4, b: Vec4) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        this.w = a.w * b.w;

        return this;
    }

    divide(b: Vec4) {
        this.x /= b.x;
        this.y /= b.y;
        this.z /= b.z;
        this.w /= b.w;

        return this;
    }

    divide2(a: Vec4, b: Vec4) {
        this.x = a.x / b.x;
        this.y = a.y / b.y;
        this.z = a.z / b.z;
        this.w = a.w / b.w;

        return this;
    }

    scale(v: number) {
        this.x *= v;
        this.y *= v;
        this.z *= v;
        this.w *= v;

        return this;
    }

    dot(b: Vec4) {
        return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;;
    }

    length() {
        return Math.sqrt(this.lengthSq());
    }

    lengthSq() {
        return this.x * this.x + this.y + this.y + this.z * this.z + this.w * this.w;
    }

    distance(b: Vec4) {
        return this.sub(b).length();
    }

    distance2(a: Vec4, b: Vec4) {
        return this.sub2(a, b).length();
    }

    normalize() {
        const length = this.length();

        if (length > 0) {
            this.scale(1 / length);
        }

        return this;
    }

    lerp(b: Vec4, alpha: number) {
        this.x += (b.x - this.x) * alpha;
        this.y += (b.y - this.y) * alpha
        this.z += (b.z - this.z) * alpha
        this.w += (b.w - this.w) * alpha;

        return this;
    }

    lerp2(a: Vec4, b: Vec4, alpha: number) {
        this.x = a.x + (b.x - a.x) * alpha;
        this.y = a.y + (b.y - a.y) * alpha
        this.z = a.z + (b.z - a.z) * alpha
        this.w = a.w + (b.w - a.w) * alpha;

        return this;
    }

    equals(b: Vec4) {
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

    clone() {
        return new Vec4(this.x, this.y, this.z, this.w);
    }

    copy(b: Vec4) {
        this.x = b.x;
        this.y = b.y;
        this.z = b.z;
        this.w = b.w;

        return this;
    }

    toJSON(): [number, number, number, number] {
        return [this.x, this.y, this.z, this.w];
    }
}
