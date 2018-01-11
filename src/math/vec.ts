export default interface Vec {
    add(b: Vec): Vec;
    add2(a: Vec, b: Vec): Vec;
    clone(): Vec;
    copy(b: Vec): Vec;
    cross?(a: Vec, b: Vec): Vec;
    dot(b: Vec): number;
    equals(b: Vec): boolean;
    length(): number;
    lengthSq(): number;
    lerp(a: Vec, b: Vec, alpha: number): Vec;
    mul(b: Vec): Vec;
    mul2(a: Vec, b: Vec): Vec;
    normalize(): Vec;
    project?(b: Vec): Vec;
    scale(scalar: number): Vec;
    set(x: number, y: number, z: number): Vec;
    sub(b: Vec): Vec;
    sub2(a: Vec, b: Vec): Vec;
    toString(): string;
}
