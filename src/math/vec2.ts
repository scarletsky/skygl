import Vec from './vec';

export default class Vec2 implements Vec {
    data: Float32Array;

    static readonly UP = new Vec2(0, 1);
    static readonly DOWN = new Vec2(0, -1);
    static readonly LEFT = new Vec2(-1, 0);
    static readonly RIGHT = new Vec2(1, 0);
    static readonly ONE = new Vec2(1, 1);
    static readonly ZERO = new Vec2(0, 0);

    constructor();
    constructor(x: number[]);
    constructor(x: number, y: number);

    constructor(x?: number[] | number, y?: number) {
        this.data = new Float32Array(2);

        if (Array.isArray(x)) {
            this.data.set(x);
        } else {
            this.data[0] = x || 0;
            this.data[1] = y || 0;
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

    add(b: Vec2) {
        this.x += b.x;
        this.y += b.y;

        return this;
    }

    add2(a: Vec2, b: Vec2) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;
    }

    clone() {
        return new Vec2().copy(this);
    }

    copy(b: Vec2) {
        this.x = b.x;
        this.y = b.y;

        return this;
    }

    dot(b: Vec2) {
        return this.x * b.x + this.y * b.y;
    }

    equals(b: Vec2) {
        return this.x === b.x && this.y === b.y;
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    lerp(a: Vec2, b: Vec2, alpha: number) {
        this.x = a.x + alpha * (b.x - a.x);
        this.y = a.y + alpha * (b.y - a.y);

        return this;
    }

    mul(b: Vec2) {
        this.x *= b.x;
        this.y *= b.y;

        return this;
    }

    mul2(a: Vec2, b: Vec2) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;

        return this;
    }

    normalize() {
        let lengthSq = this.lengthSq();
        if (lengthSq > 0) {
            let invLength = 1 / Math.sqrt(lengthSq);
            this.x *= invLength;
            this.y *= invLength;
        }

        return this;
    }

    scale(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;

        return this;
    }

    sub(b: Vec2) {
        this.x -= b.x;
        this.y -= b.y;

        return this;
    }

    sub2(a: Vec2, b: Vec2) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;
    }

    toString() {
        return `[${this.x}, ${this.y}]`;
    }
}
