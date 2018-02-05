import Mat from "./mat";

export default class Mat3 extends Mat {

    public static readonly IDENTITY = new Mat3();
    public static readonly ZERO = new Mat3(0, 0, 0, 0, 0, 0, 0, 0, 0);

    constructor(v0?: number[]);
    constructor(
        v0: number,
        v1: number,
        v2: number,
        v3: number,
        v4: number,
        v5: number,
        v6: number,
        v7: number,
        v8: number,
    );
    constructor(
        v0?: number[] | number,
        v1?: number,
        v2?: number,
        v3?: number,
        v4?: number,
        v5?: number,
        v6?: number,
        v7?: number,
        v8?: number
    ) {
        super();
        this.data = new Float32Array(9);

        if (Array.isArray(v0)) {
            this.data.set(v0);
        } else if (typeof v0 === "number") {
            this.data[0] = v0;
            this.data[1] = v1;
            this.data[2] = v2;
            this.data[3] = v3;
            this.data[4] = v4;
            this.data[5] = v5;
            this.data[6] = v6;
            this.data[7] = v7;
            this.data[8] = v8;
        } else {
            this.setIdentity();
        }
    }

    public clone() {
        return new Mat3().copy(this);
    }

    public copy(rhs: Mat3) {
        const src = rhs.data;
        const dst = this.data;

        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
        dst[6] = src[6];
        dst[7] = src[7];
        dst[8] = src[8];

        return this;
    }

    public equals(rhs: Mat3) {
        const l = this.data;
        const r = rhs.data;

        return ((l[0] === r[0]) &&
            (l[1] === r[1]) &&
            (l[2] === r[2]) &&
            (l[3] === r[3]) &&
            (l[4] === r[4]) &&
            (l[5] === r[5]) &&
            (l[6] === r[6]) &&
            (l[7] === r[7]) &&
            (l[8] === r[8]));
    }

    public isIdentity() {
        const m = this.data;
        return ((m[0] === 1) &&
            (m[1] === 0) &&
            (m[2] === 0) &&
            (m[3] === 0) &&
            (m[4] === 1) &&
            (m[5] === 0) &&
            (m[6] === 0) &&
            (m[7] === 0) &&
            (m[8] === 1));
    }

    public setIdentity() {
        const m = this.data;
        m[0] = 1;
        m[1] = 0;
        m[2] = 0;

        m[3] = 0;
        m[4] = 1;
        m[5] = 0;

        m[6] = 0;
        m[7] = 0;
        m[8] = 1;

        return this;
    }

    public transpose() {
        let tmp;
        const m = this.data;

        tmp = m[1]; m[1] = m[3]; m[3] = tmp;
        tmp = m[2]; m[2] = m[6]; m[6] = tmp;
        tmp = m[5]; m[5] = m[7]; m[7] = tmp;

        return this;
    }
}
