import { Vec3 } from './Vec3';

export interface SphereOptions {
    center?: number[];
    radius?: number;
}

export class Sphere {
    public center: Vec3;
    public radius: number;

    constructor(options: SphereOptions = {}) {
        let center = [0, 0, 0];
        let radius = 1;

        if (options.center) center = options.center;
        if (options.radius) radius = options.radius;

        this.center = new Vec3(center[0], center[1], center[2]);
        this.radius = radius;
    }

    copy(b: Sphere) {
        this.center.copy(b.center);
        this.radius = b.radius;

        return this;
    }

    clone() {
        return new Sphere().copy(this);
    }

    toJSON() {
        return {
            center: this.center.toJSON(),
            radius: this.radius
        };
    }
}
