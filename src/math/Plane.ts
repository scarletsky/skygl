import { Vec3 } from './Vec3';

export interface PlaneOptions {
    constant?: number;
    normal?: number[];
}

export class Plane {
    public normal: Vec3;
    public constant: number;

    constructor(options: PlaneOptions = {}) {
        let constant = 0;
        let normal = [1, 0, 0];

        if (options.constant) constant = options.constant;
        if (options.normal) normal = options.normal;

        this.constant = constant;
        this.normal = new Vec3(normal[0], normal[1], normal[2]);
    }

    copy(b: Plane) {
        this.normal.copy(b.normal);
        this.constant = b.constant;

        return this;
    }

    clone() {
        return new Plane().copy(this);
    }

    toJSON() {
        return {
            normal: this.normal.toJSON(),
            constant: this.constant
        };
    }
}
