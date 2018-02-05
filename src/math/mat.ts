export default abstract class Mat {
    public data: Float32Array;

    public abstract clone(): Mat;
    public abstract copy(lhs: Mat): Mat;
    public abstract equals(rhs: Mat): boolean;
    public abstract isIdentity(): boolean;
}
