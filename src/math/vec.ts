export default abstract class Vec {
    abstract data: Float32Array;

    abstract add(rhs: Vec): Vec;
    abstract add2(lhs: Vec, rhs: Vec): Vec;
    abstract clone(): Vec;
    abstract copy(rhs: Vec): Vec;
    abstract cross(lhs: Vec, rhs: Vec): Vec;
    abstract dot(rhs: Vec): number;
    abstract equals(rhs: Vec): boolean;
    abstract length(): number;
    abstract lengthSq(): number;
    abstract lerp(lhs: Vec, rhs: Vec, alpha: number): Vec;
    abstract mul(rhs: Vec): Vec;
    abstract mul2(lhs: Vec, rhs: Vec): Vec;
    abstract normalize(): Vec;
    abstract project(rhs: Vec): Vec;
    abstract scale(scalar: number): Vec;
    abstract set(x: number, y: number, z: number): Vec;
    abstract sub(rhs: Vec): Vec;
    abstract sub2(lhs: Vec, rhs: Vec): Vec;
    abstract toString(): string;
}
