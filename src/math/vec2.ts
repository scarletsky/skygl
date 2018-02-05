import Vec from "./vec";

export default class Vec2 extends Vec {

    public static readonly UP = new Vec2(0, 1);
    public static readonly DOWN = new Vec2(0, -1);
    public static readonly LEFT = new Vec2(-1, 0);
    public static readonly RIGHT = new Vec2(1, 0);
    public static readonly ONE = new Vec2(1, 1);
    public static readonly ZERO = new Vec2(0, 0);

    constructor(x?: number[]);
    constructor(x: number, y: number);
    constructor(x?: number[] | number, y?: number) {
        super();

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

    public add(rhs: Vec2) {
        this.x += rhs.x;
        this.y += rhs.y;

        return this;
    }

    public add2(lhs: Vec2, rhs: Vec2) {
        this.x = lhs.x + rhs.x;
        this.y = lhs.y + rhs.y;

        return this;
    }

    public clone() {
        return new Vec2().copy(this);
    }

    public copy(rhs: Vec2) {
        this.x = rhs.x;
        this.y = rhs.y;

        return this;
    }

    public dot(rhs: Vec2) {
        return this.x * rhs.x + this.y * rhs.y;
    }

    public equals(rhs: Vec2) {
        return this.x === rhs.x && this.y === rhs.y;
    }

    public length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    public lerp(lhs: Vec2, rhs: Vec2, alpha: number) {
        this.x = lhs.x + alpha * (rhs.x - lhs.x);
        this.y = lhs.y + alpha * (rhs.y - lhs.y);

        return this;
    }

    public mul(rhs: Vec2) {
        this.x *= rhs.x;
        this.y *= rhs.y;

        return this;
    }

    public mul2(lhs: Vec2, rhs: Vec2) {
        this.x = lhs.x * rhs.x;
        this.y = lhs.y * rhs.y;

        return this;
    }

    public normalize() {
        const lengthSq = this.lengthSq();
        if (lengthSq > 0) {
            const invLength = 1 / Math.sqrt(lengthSq);
            this.x *= invLength;
            this.y *= invLength;
        }

        return this;
    }

    public scale(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    public set(x: number, y: number) {
        this.x = x;
        this.y = y;

        return this;
    }

    public sub(rhs: Vec2) {
        this.x -= rhs.x;
        this.y -= rhs.y;

        return this;
    }

    public sub2(lhs: Vec2, rhs: Vec2) {
        this.x = lhs.x - rhs.x;
        this.y = lhs.y - rhs.y;

        return this;
    }

    public toString() {
        return `[${this.x}, ${this.y}]`;
    }
}
