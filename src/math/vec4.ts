import Vec from "./vec";

export default class Vec4 extends Vec {
    data: Float32Array;

    static readonly ONE = new Vec4(1, 1, 1, 1);
    static readonly ZERO = new Vec4(0, 0, 0, 0);

    constructor();
    constructor(x: number[]);
    constructor(x: number, y: number, z: number, w: number);
    constructor(x?: number[] | number, y?: number, z?: number, w?: number) {
        super();
        this.data = new Float32Array(4);

        if (Array.isArray(x)) {
            this.data.set(x);
        } else {
            this.data[0] = x || 0;
            this.data[1] = y || 0;
            this.data[2] = z || 0;
            this.data[3] = w || 0;
        }
    }

    get x() {
        return this.data[0];
    }

    set x(value) {
        this.data[0] = value;
    }

    get y() {
        return this.data[1];
    }

    set y(value) {
        this.data[1] = value;
    }

    get z() {
        return this.data[2];
    }

    set z(value) {
        this.data[2] = value;
    }

    get w() {
        return this.data[3];
    }

    set w(value) {
        this.data[3] = value;
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

    clone() {
        return new Vec4().copy(this);
    }

    copy(b: Vec4) {
        this.x = b.x;
        this.y = b.y;
        this.z = b.z;
        this.w = b.w;

        return this;
    }

    dot(b: Vec4) {
        return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;
    }

    equals(b: Vec4) {
        return this.x === b.x && this.y === b.y && this.z === b.z && this.w === b.w;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    lerp(a: Vec4, b: Vec4, alpha: number) {
        this.x = a.x + alpha * (b.x - a.x);
        this.y = a.y + alpha * (b.y - a.y);
        this.z = a.z + alpha * (b.z - a.z);
        this.w = a.w + alpha * (b.w - a.w);

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

    normalize() {
        let lengthSq = this.lengthSq();

        if (lengthSq > 0) {
            let invLength = 1 / Math.sqrt(lengthSq);
            this.x *= invLength;
            this.y *= invLength;
            this.z *= invLength;
            this.w *= invLength;
        }

        return this;
    }

    scale(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;

        return this;
    }

    set(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

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

    toString() {
        return `[${this.x}, ${this.y}, ${this.z}, ${this.w}]`;
    }
}
