import Vec from "./vec";

export default class Vec3 extends Vec {

    public static readonly BACK = new Vec3(0, 0, 1);
    public static readonly DOWN = new Vec3(0, -1, 0);
    public static readonly FORWARD = new Vec3(0, 0, -1);
    public static readonly LEFT = new Vec3(-1, 0, 0);
    public static readonly ONE = new Vec3(1, 1, 1);
    public static readonly RIGHT = new Vec3(1, 0, 0);
    public static readonly UP = new Vec3(0, 1, 0);
    public static readonly ZERO = new Vec3(0, 0, 0);

    public x: number;
    public y: number;
    public z: number;

    constructor(x?: number[] | number, y?: number, z?: number) {
        super();

        if (Array.isArray(x)) {
            this.x = x[0];
            this.y = x[1];
            this.z = x[2];
        } else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
    }

    public add(rhs: Vec3) {
        this.x += rhs.x;
        this.y += rhs.y;
        this.z += rhs.z;

        return this;
    }

    public add2(lhs: Vec3, rhs: Vec3) {
        this.x = lhs.x + rhs.x;
        this.y = lhs.y + rhs.y;
        this.z = lhs.z + rhs.z;

        return this;
    }

    public clone() {
        return new Vec3().copy(this);
    }

    public copy(rhs: Vec3) {
        this.x = rhs.x;
        this.y = rhs.y;
        this.z = rhs.z;

        return this;
    }

    public cross(lhs: Vec3, rhs: Vec3) {
        this.x = lhs.y * rhs.z - rhs.y * lhs.z;
        this.y = lhs.z * rhs.x - rhs.z * lhs.x;
        this.z = lhs.x * rhs.y - rhs.x * lhs.y;

        return this;
    }

    public dot(rhs: Vec3) {
        return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
    }

    public equals(rhs: Vec3) {
        return this.x === rhs.x && this.y === rhs.y && this.z === rhs.z;
    }

    public length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public lerp(lhs: Vec3, rhs: Vec3, alpha: number) {
        this.x = lhs.x + alpha * (rhs.x - lhs.x);
        this.y = lhs.y + alpha * (rhs.y - lhs.y);
        this.z = lhs.z + alpha * (rhs.z - lhs.z);

        return this;
    }

    public mul(rhs: Vec3) {
        this.x *= rhs.x;
        this.y *= rhs.y;
        this.z *= rhs.z;

        return this;
    }

    public mul2(lhs: Vec3, rhs: Vec3) {
        this.x = lhs.x * rhs.x;
        this.y = lhs.y * rhs.y;
        this.z = lhs.z * rhs.z;

        return this;
    }

    public normalize() {
        const lengthSq = this.lengthSq();

        if (lengthSq > 0) {
            const invLength = 1 / Math.sqrt(lengthSq);
            this.x *= invLength;
            this.y *= invLength;
            this.z *= invLength;
        }

        return this;
    }

    public project(rhs: Vec3) {
        const aDotB = this.dot(rhs);
        const bDotB = rhs.dot(rhs);
        const s = aDotB / bDotB;

        this.x = rhs.x * s;
        this.y = rhs.y * s;
        this.z = rhs.z * s;

        return this;
    }

    public scale(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;
    }

    public set(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    public sub(rhs: Vec3) {
        this.x -= rhs.x;
        this.y -= rhs.y;
        this.z -= rhs.z;

        return this;
    }

    public sub2(lhs: Vec3, rhs: Vec3) {
        this.x = lhs.x - rhs.x;
        this.y = lhs.y - rhs.y;
        this.z = lhs.z - rhs.z;

        return this;
    }

    public toString() {
        return `[${this.x}, ${this.y}, ${this.z}]`;
    }
}
