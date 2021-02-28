import { Vec3 } from './Vec3';

export interface PlaneOptions {
    constant?: number;
    normal?: number[];
}

export class Plane {
    public normal: Vec3;
    public constant: number;

    constructor(options: PlaneOptions = {}) {
        let constant, normal;

        if (!options.constant) constant = 0;
        if (!options.normal) normal = new Vec3(1, 0, 0);
        if (Array.isArray(options.normal)) normal = new Vec3(options.normal[0], options.normal[1], options.normal[2]);

        this.constant = constant as number;
        this.normal = normal as Vec3;
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
