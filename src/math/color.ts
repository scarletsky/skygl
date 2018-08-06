import Vec4 from "./vec4";

export default class Color extends Vec4 {

    constructor(...args: number[]) {
        super(args);
    }

    get r() {
        return this.data[0];
    }

    set r(value) {
        this.data[0] = value;
    }

    get g() {
        return this.data[1];
    }

    set g(value) {
        this.data[1] = value;
    }

    get b() {
        return this.data[2];
    }

    set b(value) {
        this.data[2] = value;
    }

    get a() {
        return this.data[3];
    }

    set a(value) {
        this.data[3] = value;
    }
}
