import { Plane, PlaneOptions } from './Plane';

export interface FrustumOptions {
    p0?: PlaneOptions;
    p1?: PlaneOptions;
    p2?: PlaneOptions;
    p3?: PlaneOptions;
    p4?: PlaneOptions;
    p5?: PlaneOptions;
}

export class Frustum {
    public planes: [Plane, Plane, Plane, Plane, Plane, Plane];

    constructor(options: FrustumOptions = {}) {

        const p0 = options.p0 ? new Plane(options.p0) : new Plane();
        const p1 = options.p1 ? new Plane(options.p1) : new Plane();
        const p2 = options.p2 ? new Plane(options.p2) : new Plane();
        const p3 = options.p3 ? new Plane(options.p3) : new Plane();
        const p4 = options.p4 ? new Plane(options.p4) : new Plane();
        const p5 = options.p5 ? new Plane(options.p5) : new Plane();

        this.planes = [p0, p1, p2, p3, p4, p5];
    }

    copy(b: Frustum) {
        this.planes.forEach((plane, i) => plane.copy(b.planes[i]));

        return this;
    }

    clone() {
        return new Frustum().copy(this);
    }

    toJSON() {
        return {
            p0: this.planes[0].toJSON(),
            p1: this.planes[1].toJSON(),
            p2: this.planes[2].toJSON(),
            p3: this.planes[3].toJSON(),
            p4: this.planes[4].toJSON(),
            p5: this.planes[5].toJSON(),
        };
    }
}
