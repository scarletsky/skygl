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
            this.a = a || 0;
        }
    }
}
