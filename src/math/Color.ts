import { Array3, Array4 } from 'types';
import { isArray, isNumber } from 'utils';
import { EPSILON } from './math';

export type RGBOptions = Array3<number>;
export type RGBAOptions = Array4<number>;
export type ColorOptions = RGBAOptions;

export class Color {
    public r = 0;
    public g = 0;
    public b = 0;
    public a = 1;

    static create(options?: RGBOptions | RGBAOptions) {
        return new Color(options);
    }

    static isColor(value: any): value is Color {
        return value instanceof Color;
    }

    constructor(options?: RGBOptions | RGBAOptions) {
        this.fromJSON(options);
    }

    fromJSON(options?: RGBOptions | RGBAOptions) {
         if (isArray(options)) {
            if (options.length === 4) this.fromRGBA(options);
            if (options.length === 3) this.fromRGB(options);
        }
    }

    toJSON() {
        return this.toRGBA();
    }

    fromRGB(options: RGBOptions) {
        this.r = isNumber(options[0]) ? options[0] : 0;
        this.g = isNumber(options[1]) ? options[1] : 0;
        this.b = isNumber(options[2]) ? options[2] : 0;
    }

    toRGB(): RGBOptions {
        return [this.r, this.g, this.b];
    }

    fromRGBA(options: RGBAOptions) {
        this.r = isNumber(options[0]) ? options[0] : 0;
        this.g = isNumber(options[1]) ? options[1] : 0;
        this.b = isNumber(options[2]) ? options[2] : 0;
        this.a = isNumber(options[3]) ? options[3] : 1;
    }

    toRGBA(): RGBAOptions {
        return [this.r, this.g, this.b, this.a];
    }

    equals(b: Color) {
        let a0 = this.r;
        let a1 = this.g;
        let a2 = this.b;
        let a3 = this.a;
        let b0 = b.r;
        let b1 = b.g;
        let b2 = b.b;
        let b3 = b.a;

        return (
            Math.abs(a0 - b0) <=
                EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <=
                EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <=
                EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <=
                EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3))
        );
    }
}
