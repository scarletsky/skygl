import { Mat4 } from './Mat4';

export type Mat3Data = [
    number, number, number,
    number, number, number,
    number, number, number
];

export class Mat3 {
    public data: Mat3Data;

    static tmpA = new Mat3();
    static tmpB = new Mat3();
    static IDENTITY = Object.freeze(new Mat3());

    static create() {
        return new Mat3();
    }

    constructor() {
        this.data = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ];
    }

    set(b: Mat3Data) {
        for (let i = 0; i < b.length; i++) {
            this.data[i] = b[i];
        }

        return this;
    }

    clone() {
        return Mat3.create().set(this.data);
    }

    copy(b: Mat3) {
        this.set(b.data);

        return this;
    }

    mul(b: Mat3) {
        return this.mul2(this, b);
    }

    mul2(a: Mat3, b: Mat3) {
        const data = this.data;
        const data1 = a.data;
        const data2 = b.data;

        const a11 = data1[0], a12 = data1[3], a13 = data1[6];
        const a21 = data1[1], a22 = data1[4], a23 = data1[7];
        const a31 = data1[2], a32 = data1[5], a33 = data1[8];

        const b11 = data2[0], b12 = data2[3], b13 = data2[6];
        const b21 = data2[1], b22 = data2[4], b23 = data2[7];
        const b31 = data2[2], b32 = data2[5], b33 = data2[8];

        data[0] = a11 * b11 + a12 * b21 + a13 * b31;
        data[3] = a11 * b12 + a12 * b22 + a13 * b32;
        data[6] = a11 * b13 + a12 * b23 + a13 * b33;

        data[1] = a21 * b11 + a22 * b21 + a23 * b31;
        data[4] = a21 * b12 + a22 * b22 + a23 * b32;
        data[7] = a21 * b13 + a22 * b23 + a23 * b33;

        data[2] = a31 * b11 + a32 * b21 + a33 * b31;
        data[5] = a31 * b12 + a32 * b22 + a33 * b32;
        data[8] = a31 * b13 + a32 * b23 + a33 * b33;

        return this;
    }

    transpose() {
        const data = this.data;

        let tmp;

        tmp = data[1]; data[1] = data[3]; data[3] = tmp;
        tmp = data[2]; data[2] = data[6]; data[6] = tmp;
        tmp = data[5]; data[5] = data[7]; data[7] = tmp;

        return this;
    }

    setIdentity() {
        const data = this.data;

        data[0] = 1;
        data[1] = 0;
        data[2] = 0;

        data[3] = 0;
        data[4] = 1;
        data[5] = 0;

        data[6] = 0;
        data[7] = 0;
        data[8] = 1;

        return this;
    }

    setFromMat4(mat: Mat4) {
        const data = mat.data;
        this.set([
            data[0], data[1], data[2],
            data[4], data[5], data[6],
            data[8], data[9], data[10]
        ]);
    }

    toJSON() {
        const data = this.data;
        return [
            data[0], data[1], data[2],
            data[3], data[4], data[5],
            data[6], data[7], data[8]
        ];
    }
}
