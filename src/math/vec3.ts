import Vec from './vec';

export default class Vec3 implements Vec {

    data: Float32Array;

    static readonly BACK = new Vec3(0, 0, 1);
    static readonly DOWN = new Vec3(0, -1, 0);
    static readonly FORWARD = new Vec3(0, 0, -1);
    static readonly LEFT = new Vec3(-1, 0, 0);
    static readonly ONE = new Vec3(1, 1, 1);
    static readonly RIGHT = new Vec3(1, 0, 0);
    static readonly UP = new Vec3(0, 1, 0);
    static readonly ZERO = new Vec3(0, 0, 0);

    constructor();
    constructor(x: number[]);
    constructor(x: number, y: number, z: number);
    constructor(x?: number[] | number, y?: number, z?: number) {
        this.data = new Float32Array(3);

        if (Array.isArray(x)) {
            this.data.set(x);
        } else {
            this.data[0] = x || 0;
            this.data[1] = y || 0;
            this.data[2] = z || 0;
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

    clone() {
        return new Vec3().copy(this);
    }

    copy(b: Vec3) {
        this.x = b.x;
        this.y = b.y;
        this.z = b.z;

        return this;
    }

    cross(a: Vec3, b: Vec3) {
        this.x = a.y * b.z - b.y * a.z;
        this.y = a.z * b.x - b.z * a.x;
        this.z = a.x * b.y - b.x * a.y;

        return this;
    }

    dot(b: Vec3) {
        return this.x * b.x + this.y * b.y + this.z * b.z;
    }

    equals(b: Vec3) {
        return this.x === b.x && this.y === b.y && this.z === b.z;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    lerp(a: Vec3, b: Vec3, alpha: number) {
        this.x = a.x + alpha * (b.x - a.x);
        this.y = a.y + alpha * (b.y - a.y);
        this.z = a.z + alpha * (b.z - a.z);

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

    normalize() {
        let lengthSq = this.lengthSq();

        if (lengthSq > 0) {
            let invLength = 1 / Math.sqrt(lengthSq);
            this.x *= invLength;
            this.y *= invLength;
            this.z *= invLength;
        }

        return this;
    }

    project(b: Vec3) {
        let a_dot_b = this.dot(b);
        let b_dot_b = b.dot(b);
        let s = a_dot_b / b_dot_b;

        this.x = b.x * s;
        this.y = b.y * s;
        this.z = b.z * s;

        return this;
    }

    scale(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;
    }

    set(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;

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

    toString() {
        return `[${this.x}, ${this.y}, ${this.z}]`;
    }
}
