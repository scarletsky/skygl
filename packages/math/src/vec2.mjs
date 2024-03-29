import { config, lerp, round } from './common.mjs';
import { Vec3 } from './vec3.mjs';

export class Vec2 {

  static create(x, y) {
    return new Vec2(x, y);
  }

  static ZERO = new Vec2(0, 0);

  constructor(x = 0, y = 0) {
    this[0] = x;
    this[1] = y;
  }

  get x() {
    return this[0];
  }

  set x(v) {
    this[0] = v;
  }

  get y() {
    return this[1];
  }

  set y(v) {
    this[1] = v;
  }

  set(x, y) {
    this[0] = x;
    this[1] = y;
    return this;
  }

  clone(out = new Vec2()) {
    return out.copy(this);
  }

  copy(out) {
    out[0] = this[0];
    out[1] = this[1];
    return out;
  }

  add(b) {
    this[0] += b[0];
    this[1] += b[1];
    return this;
  }

  add2(a, b) {
    this[0] = a[0] + b[0];
    this[1] = a[1] + b[1];
    return this;
  }

  addScalar(k) {
    this[0] += k;
    this[1] += k;
    return this;
  }


  subtract(b) {
    this[0] -= b[0];
    this[1] -= b[1];
    return this;
  }

  subtract2(a, b) {
    this[0] = a[0] - b[0];
    this[1] = a[1] - b[1];
    return this;
  }

  subtractScalar(k) {
    this[0] -= k;
    this[1] -= k;
    return this;
  }

  multiply(b) {
    this[0] *= b[0];
    this[1] *= b[1];
    return this;
  }

  multiply2(a, b) {
    this[0] = a[0] * b[0];
    this[1] = a[1] * b[1];
    return this;
  }

  multiplyScalar(k) {
    this[0] *= k;
    this[1] *= k;
    return this;
  }

  divide(b) {
    this[0] /= b[0];
    this[1] /= b[1];
    return this;
  }

  divide2(a, b) {
    this[0] = a[0] / b[0];
    this[1] = a[1] / b[1];
    return this;
  }

  divideScalar(k) {
    this[0] /= k;
    this[1] /= k;
    return this;
  }

  ceil() {
    this[0] = Math.ceil(this[0]);
    this[1] = Math.ceil(this[1]);
    return this;
  }

  floor() {
    this[0] = Math.floor(this[0]);
    this[1] = Math.floor(this[1]);
    return this;
  }

  round() {
    this[0] = round(this[0]);
    this[1] = round(this[1]);
    return this;
  }

  min(b) {
    this[0] = Math.min(this[0], b[0]);
    this[1] = Math.min(this[1], b[1]);
    return this;
  }

  min2(a, b) {
    this[0] = Math.min(a[0], b[0]);
    this[1] = Math.min(a[1], b[1]);
    return this;
  }

  max(b) {
    this[0] = Math.max(this[0], b[0]);
    this[1] = Math.max(this[1], b[1]);
    return this;
  }

  max2(a, b) {
    this[0] = Math.max(a[0], b[0]);
    this[1] = Math.max(a[1], b[1]);
    return this;
  }

  negate() {
    this[0] = -this[0];
    this[1] = -this[1];
    return this;
  }

  zero() {
    this[0] = 0;
    this[1] = 0;
    return this;
  }

  inverse() {
    this[0] = 1.0 / this[0];
    this[1] = 1.0 / this[1];
    return this;
  }

  length() {
    return Math.sqrt(this.lengthSq());
  }

  lengthSq() {
    const x = this[0];
    const y = this[1];
    return x * x + y * y;
  }

  distance(b) {
    return Math.sqrt(this.distanceSq(b));
  }

  distanceSq(b) {
    const x = b[0] - this[0];
    const y = b[1] - this[1];
    return x * x + y * y;
  }

  random(scale = 1) {
    const r = Math.random() * 2.0 * Math.PI;
    this[0] = Math.cos(r) * scale;
    this[1] = Math.sin(r) * scale;
    return this;
  }

  normalize() {
    const len = this.length() || 1;
    return this.divideScalar(len);
  }

  dot(b) {
    return this[0] * b[0] + this[1] * b[1];
  }

  cross(b, out = new Vec3()) {
    const z = this[0] * b[1] - this[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
  }

  cross2(a, b, out = new Vec3()) {
    return this.copy(a).cross(b, out);
  }

  lerp(b, t, out = this) {
    const ax = this[0];
    const ay = this[1];
    out[0] = lerp(ax, b[0], t);
    out[1] = lerp(ay, b[1], t);
    return out;
  }

  lerp2(a, b, t, out = this) {
    return out.copy(a).lerp(b, t);
  }

  transformByMat2(m, out = this) {
    let x = this[0],
        y = this[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
  }

  transformByMat3(m, out = this) {
    let x = this[0],
        y = this[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
  }

  transformByMat4(m, out = this) {
    let x = this[0];
    let y = this[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
  }

  rotate(rad, origin = Vec2.ZERO, out = this) {
    //Translate point to the origin
    let p0 = this[0] - origin[0],
        p1 = this[1] - origin[1],
        sinC = Math.sin(rad),
        cosC = Math.cos(rad);

    //perform rotation and translate to correct position
    out[0] = p0 * cosC - p1 * sinC + origin[0];
    out[1] = p0 * sinC + p1 * cosC + origin[1];
    return out;
  }

  angle(b) {
    let x1 = this[0],
        y1 = this[1],
        x2 = b[0],
        y2 = b[1],
        // mag is the product of the magnitudes of a and b
        mag = Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2)),
        // mag &&.. short circuits if mag == 0
        cosine = mag && (x1 * x2 + y1 * y2) / mag;
    // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }

  equals(b, epsilon = config.EPSILON) {
    let a0 = a[0],
        a1 = a[1];
    let b0 = b[0],
        b1 = b[1];
    return (
        Math.abs(a0 - b0) <= epsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= epsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1))
    );
  }

  exactEquals(b) {
    return this[0] === b[0] && this[1] === b[1];
  }

  fromJSON(d) {
    return this.set(d[0], d[1]);
  }

  toJSON() {
    return [this[0], this[1]];
  }
}

Vec2.prototype.isVec2 = true;
Vec2.prototype.sub = Vec2.prototype.subtract;
Vec2.prototype.sub2 = Vec2.prototype.subtract2;
Vec2.prototype.subScalar = Vec2.prototype.subtractScalar;
Vec2.prototype.mul = Vec2.prototype.multiply;
Vec2.prototype.mul2 = Vec2.prototype.multiply2;
Vec2.prototype.mulScalar = Vec2.prototype.multiplyScalar;
Vec2.prototype.div = Vec2.prototype.divide;
Vec2.prototype.div2 = Vec2.prototype.divide2;
Vec2.prototype.divScalar = Vec2.prototype.divideScalar;
Vec2.prototype.len = Vec2.prototype.length;
Vec2.prototype.dist = Vec2.prototype.distance;
