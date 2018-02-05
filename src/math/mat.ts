import Vec from "./vec";

export default abstract class Mat {
    public data: Float32Array;

    public abstract add(b: Mat): Mat;
    public abstract add2(a: Mat, b: Mat): Mat;
    public abstract clone(): Mat;
    public abstract equals(b: Mat): boolean;
    public abstract isIdentity(): boolean;
    public abstract mul(b: Mat): Mat;
    public abstract mul2(a: Mat, b: Mat): Mat;
    public abstract transformPoint(vec: Vec, res?: Vec): Vec;
    public abstract transformVector(vec: Vec, res?: Vec): Vec;
}
