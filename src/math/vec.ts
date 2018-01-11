export default abstract class Vec {
    data: Float32Array;

    abstract add(b: Vec): Vec;
    abstract add2(a: Vec, b: Vec): Vec;
    abstract clone(): Vec;
    abstract copy(b: Vec): Vec;
    abstract cross(a: Vec, b: Vec): Vec;
    abstract dot(b: Vec): number;
    abstract equals(b: Vec): boolean;
    abstract length(): number;
    abstract lengthSq(): number;
    abstract lerp(a: Vec, b: Vec, alpha: number): Vec;
    abstract mul(b: Vec): Vec;
    abstract mul2(a: Vec, b: Vec): Vec;
    abstract normalize(): Vec;
    abstract project(b: Vec): Vec;
    abstract scale(scalar: number): Vec;
    abstract set(x: number, y: number, z: number): Vec;
    abstract sub(b: Vec): Vec;
    abstract sub2(a: Vec, b: Vec): Vec;
    abstract toString(): string;
}
