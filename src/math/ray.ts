import Vec3 from "./vec3";

export default class Ray {
    public origin: Vec3;
    public direction: Vec3;

    constructor(origin?: Vec3, direction?: Vec3) {
        this.origin = origin || new Vec3(0, 0, 0);
        this.direction = direction || new Vec3(0, 0, -1);
    }
}
