import Vec3 from "./vec3";
import Ray from "./ray";

const vecA = new Vec3();

export default class Plane {
    public point: Vec3;
    public normal: Vec3;

    constructor(point?: Vec3, normal?: Vec3) {
        this.point = point || new Vec3(0, 0, 0);
        this.normal = normal || new Vec3(0, 1, 0);
    }

    public intersectsLine(start: Vec3, end: Vec3, point?: Vec3) {
        const d = -this.normal.dot(this.point);
        const d0 = this.normal.dot(start) + d;
        const d1 = this.normal.dot(end) + d;

        const t = d0 / (d0 - d1);
        const intersects = t >= 0 && t <= 1;

        if (intersects && point) {
            point.lerp(start, end, t);
        }

        return intersects;
    }

    /*
     * plane formula: dot((p - p0), n) = 0
     * ray formula: p = o + t*d
     * intersects formula: t = dot((p - o), n) / dot(d, n)
     */
    public intersectsRay(ray: Ray, point?: Vec3) {
        var pointToOrigin = vecA.sub2(this.point, ray.origin);
        var t = this.normal.dot(pointToOrigin) / this.normal.dot(ray.direction);
        var intersects = t >= 0;

        if (intersects && point) {
            point.copy(ray.direction).scale(t).add(ray.origin);
        }

        return intersects;
    }
}
