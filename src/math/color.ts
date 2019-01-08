export default class Color {
    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor(r?: number[] | number, g?: number, b?: number, a?: number) {
        if (Array.isArray(r)) {
            this.r = r[0];
            this.g = r[1];
            this.b = r[2];
            this.a = r[3];
        } else {
            this.r = r || 0;
            this.g = g || 0;
            this.b = b || 0;
            this.a = a || 1;
        }
    }

    // for ShaderUniform#setVec4
    public get x() {
        return this.r;
    }

    public get y() {
        return this.g;
    }

    public get z() {
        return this.b;
    }

    public get w() {
        return this.a;
    }

    public clone() {
        return new Color().copy(this);
    }

    public copy(rhs: Color) {
        this.r = rhs.r;
        this.g = rhs.g;
        this.b = rhs.b;
        this.a = rhs.a;

        return this;
    }

    public lerp(lhs: Color, rhs: Color, alpha: number) {
        this.r = lhs.r + alpha * (rhs.r - lhs.r);
        this.g = lhs.g + alpha * (rhs.g - lhs.g);
        this.b = lhs.b + alpha * (rhs.b - lhs.b);
        this.a = lhs.a + alpha * (rhs.a - lhs.a);

        return this;
    }

    public set(r: number, g: number, b: number, a: number = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        return this;
    }

    public toString() {
        return `[${this.r}, ${this.g}, ${this.b}, ${this.a}]`;
    }
}
