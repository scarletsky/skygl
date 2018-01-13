import Vec from './vec';

export default interface Mat {
    add(b: Mat): Mat;
    add2(a: Mat, b: Mat): Mat;
    clone(): Mat;
    equals(b: Mat): boolean;
    isIdentity(): boolean;
    mul(b: Mat): Mat;
    mul2(a: Mat, b: Mat): Mat;
    transformPoint(vec: Vec, res?: Vec): Vec;
    transformVector(vec: Vec, res?: Vec): Vec;
}
