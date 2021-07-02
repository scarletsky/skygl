export interface ColorOptions {
    r: number;
    g: number;
    b: number;
}

export class Color {
    constructor(
        public r = 0,
        public g = 0,
        public b = 0
    ) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    fromJSON(options: ColorOptions) {
        this.r = options.r;
        this.g = options.g;
        this.b = options.b;
    }

    toJSON() {
        return {
            r: this.r,
            g: this.g,
            b: this.b
        };
    }
}
