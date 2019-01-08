export default abstract class Vec {
    public abstract add(rhs: Vec): Vec;
    public abstract add2(lhs: Vec, rhs: Vec): Vec;
    public abstract clone(): Vec;
    public abstract copy(rhs: Vec): Vec;
    public abstract dot(rhs: Vec): number;
    public abstract equals(rhs: Vec): boolean;
    public abstract length(): number;
    public abstract lengthSq(): number;
    public abstract lerp(lhs: Vec, rhs: Vec, alphlhs: number): Vec;
    public abstract mul(rhs: Vec): Vec;
    public abstract mul2(lhs: Vec, rhs: Vec): Vec;
    public abstract normalize(): Vec;
    public abstract scale(scalar: number): Vec;
    public abstract set(x: number, y: number, z: number, w: number): Vec;
    public abstract sub(rhs: Vec): Vec;
    public abstract sub2(lhs: Vec, rhs: Vec): Vec;
    public abstract toString(): string;
}
