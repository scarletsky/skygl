import { EPSILON } from './math';

export class Vec2 {
    public x: number;
    public y: number;

    static ZERO = Object.freeze(new Vec2(0, 0));
    static ONE = Object.freeze(new Vec2(1, 1));
    static UP = Object.freeze(new Vec2(0, 1));
    static DOWN = Object.freeze(new Vec2(0, -1));
    static RIGHT = Object.freeze(new Vec2(1, 0));
    static LEFT = Object.freeze(new Vec2(-1, 0));

    static create() {
        return new Vec2();
    }

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;

        return this;
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

    divide(b: Vec2) {
        this.x /= b.x;
        this.y /= b.y;

        return this;
    }

    divide2(a: Vec2, b: Vec2) {
        this.x = a.x / b.x;
        this.y = a.y / b.y;

        return this;
    }

    scale(v: number) {
        this.x *= v;
        this.y *= v;

        return this;
    }

    dot(b: Vec2) {
        return this.x * b.x + this.y * b.y;
    }

    cross(b: Vec2) {
        return this.x * b.y - this.y * b.x;;
    }

    length() {
        return Math.sqrt(this.lengthSq());
    }

    lengthSq() {
        return this.x * this.x + this.y + this.y;
    }

    distance(b: Vec2) {
        return this.sub(b).length();
    }

    distance2(a: Vec2, b: Vec2) {
        return this.sub2(a, b).length();
    }

    normalize() {
        const length = this.length();

        if (length > 0) {
            this.scale(1 / length);
        }

        return this;
    }

    lerp(b: Vec2, alpha: number) {
        this.x += (b.x - this.x) * alpha;
        this.y += (b.y - this.y) * alpha

        return this;
    }

    lerp2(a: Vec2, b: Vec2, alpha: number) {
        this.x = a.x + (b.x - a.x) * alpha;
        this.y = a.y + (b.y - a.y) * alpha

        return this;
    }

    equals(b: Vec2) {
        let a0 = this.x;
        let a1 = this.y;
        let b0 = b.x;
        let b1 = b.y;

        return (
            Math.abs(a0 - b0) <=
                EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <=
                EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1))
        );
    }

    clone() {
        return new Vec2(this.x, this.y);
    }

    copy(b: Vec2) {
        this.x = b.x;
        this.y = b.y;

        return this;
    }

    toJSON() {
        return [this.x, this.y];
    }
}
