import { EPSILON } from './math';

export class Vec3 {
    public x: number;
    public y: number;
    public z: number;

    static ZERO = Object.freeze(new Vec3(0, 0, 0));
    static ONE = Object.freeze(new Vec3(1, 1, 1));
    static UP = Object.freeze(new Vec3(0, 1, 0));
    static DOWN = Object.freeze(new Vec3(0, -1, 0));
    static RIGHT = Object.freeze(new Vec3(1, 0, 0));
    static LEFT = Object.freeze(new Vec3(-1, 0, 0));
    static FORWARD = Object.freeze(new Vec3(0, 0, -1));
    static BACK = Object.freeze(new Vec3(0, 0, 1));

    static create() {
        return new Vec3();
    }

    static isVec3(value: any): value is Vec3 {
        return value instanceof Vec3;
    }

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    add(b: Vec3) {
        this.x += b.x;
        this.y += b.y;
        this.z += b.z;

        return this;
    }

    add2(a: Vec3, b: Vec3) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.z = a.z + b.z;

        return this;
    }

    sub(b: Vec3) {
        this.x -= b.x;
        this.y -= b.y;
        this.z -= b.z;

        return this;
    }

    sub2(a: Vec3, b: Vec3) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.z = a.z - b.z;

        return this;
    }

    mul(b: Vec3) {
        this.x *= b.x;
        this.y *= b.y;
        this.z *= b.z;

        return this;
    }

    mul2(a: Vec3, b: Vec3) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;

        return this;
    }

    divide(b: Vec3) {
        this.x /= b.x;
        this.y /= b.y;
        this.z /= b.z;

        return this;
    }

    divide2(a: Vec3, b: Vec3) {
        this.x = a.x / b.x;
        this.y = a.y / b.y;
        this.z = a.z / b.z;

        return this;
    }

    scale(v: number) {
        this.x *= v;
        this.y *= v;
        this.z *= v;

        return this;
    }

    dot(b: Vec3) {
        return this.x * b.x + this.y * b.y + this.z * b.z;
    }

    cross(b: Vec3) {
        this.x = this.y * b.z - b.y * this.z;
        this.y = this.z * b.x - b.z * this.x;
        this.z = this.x * b.y - b.x * this.y;

        return this;
    }

    cross2(a: Vec3, b: Vec3) {
        this.x = a.y * b.z - b.y * a.z;
        this.y = a.z * b.x - b.z * a.x;
        this.z = a.x * b.y - b.x * a.y;

        return this;
    }

    length() {
        return Math.hypot(this.x, this.y, this.z);
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    distance(b: Vec3) {
        return this.sub(b).length();
    }

    distance2(a: Vec3, b: Vec3) {
        return this.sub2(a, b).length();
    }

    normalize() {
        const length = this.length();

        if (length > 0) {
            this.scale(1 / length);
        }

        return this;
    }

    inverse() {
        this.x = 1 / this.x;
        this.y = 1 / this.y;
        this.z = 1 / this.z;

        return this;
    }

    lerp(b: Vec3, alpha: number) {
        this.x += (b.x - this.x) * alpha;
        this.y += (b.y - this.y) * alpha
        this.z += (b.z - this.z) * alpha

        return this;
    }

    lerp2(a: Vec3, b: Vec3, alpha: number) {
        this.x = a.x + (b.x - a.x) * alpha;
        this.y = a.y + (b.y - a.y) * alpha
        this.z = a.z + (b.z - a.z) * alpha

        return this;
    }

    project(b: Vec3) {
        const aDotB = this.dot(b);
        const bDotB = b.dot(b);
        const s = aDotB / bDotB;

        this.x = b.x * s;
        this.y = b.y * s;
        this.z = b.z * s;

        return this;
    }

    equals(b: Vec3) {
        let a0 = this.x;
        let a1 = this.y;
        let a2 = this.z;
        let b0 = b.x;
        let b1 = b.y;
        let b2 = b.z;

        return (
            Math.abs(a0 - b0) <=
                EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <=
                EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <=
                EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2))
        );
    }

    clone() {
        return new Vec3(this.x, this.y, this.z);
    }

    copy(b: Vec3) {
        this.x = b.x;
        this.y = b.y;
        this.z = b.z;

        return this;
    }

    toJSON(): [number, number, number] {
        return [this.x, this.y, this.z];
    }
}
