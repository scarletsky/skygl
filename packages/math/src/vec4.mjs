import { config, lerp, round } from './common.mjs';

export class Vec4 {
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this[3] = w;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get z() {
    return this[2];
  }

  get w() {
    return this[3];
  }

  set(x, y, z, w) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this[3] = w;
    return this;
  }

  copy(b) {
    this[0] = b[0];
    this[1] = b[1];
    this[2] = b[2];
    this[3] = b[3];
    return this;
  }

  clone(out = new Vec4()) {
    out[0] = this[0];
    out[1] = this[1];
    out[2] = this[2];
    out[3] = this[3];
    return out;
  }

  add(b) {
    this[0] += b[0];
    this[1] += b[1];
    this[2] += b[2];
    this[3] += b[3];
    return this;
  }

  add2(a, b) {
    this[0] = a[0] + b[0];
    this[1] = a[1] + b[1];
    this[2] = a[2] + b[2];
    this[3] = a[3] + b[3];
    return this;
  }

  addScalar(k) {
    this[0] += k;
    this[1] += k;
    this[2] += k;
    this[3] += k;
    return this;
  }

  subtract(b) {
    this[0] -= b[0];
    this[1] -= b[1];
    this[2] -= b[2];
    this[3] -= b[3];
    return this;
  }

  subtract2(a, b) {
    this[0] = a[0] - b[0];
    this[1] = a[1] - b[1];
    this[2] = a[2] - b[2];
    this[3] = a[3] - b[3];
    return this;
  }

  subtractScalar(k) {
    this[0] -= k;
    this[1] -= k;
    this[2] -= k;
    this[3] -= k;
    return this;
  }

  multiply(b) {
    this[0] *= b[0];
    this[1] *= b[1];
    this[2] *= b[2];
    this[3] *= b[3];
    return this;
  }

  multiply2(a, b) {
    this[0] = a[0] * b[0];
    this[1] = a[1] * b[1];
    this[2] = a[2] * b[2];
    this[3] = a[3] * b[3];
    return this;
  }

  multiplyScalar(k) {
    this[0] *= k;
    this[1] *= k;
    this[2] *= k;
    this[3] *= k;
    return this;
  }

  divide(b) {
    this[0] /= b[0];
    this[1] /= b[1];
    this[2] /= b[2];
    this[3] /= b[3];
    return this;
  }

  divide2(a, b) {
    this[0] = a[0] / b[0];
    this[1] = a[1] / b[1];
    this[2] = a[2] / b[2];
    this[3] = a[3] / b[3];
    return this;
  }

  divideScalar(k) {
    this[0] /= k;
    this[1] /= k;
    this[2] /= k;
    this[3] /= k;
    return this;
  }

  ceil() {
    this[0] = Math.ceil(this[0]);
    this[1] = Math.ceil(this[1]);
    this[2] = Math.ceil(this[2]);
    this[3] = Math.ceil(this[3]);
    return this;
  }

  floor() {
    this[0] = Math.floor(this[0]);
    this[1] = Math.floor(this[1]);
    this[2] = Math.floor(this[2]);
    this[3] = Math.floor(this[3]);
    return this;
  }

  round() {
    this[0] = round(this[0]);
    this[1] = round(this[1]);
    this[2] = round(this[2]);
    this[3] = round(this[3]);
    return this;
  }

  min(b) {
    this[0] = Math.min(this[0], b[0]);
    this[1] = Math.min(this[1], b[1]);
    this[2] = Math.min(this[2], b[2]);
    this[3] = Math.min(this[3], b[3]);
    return this;
  }

  min2(a, b) {
    this[0] = Math.min(a[0], b[0]);
    this[1] = Math.min(a[1], b[1]);
    this[2] = Math.min(a[2], b[2]);
    this[e] = Math.min(a[3], b[3]);
    return this;
  }

  max(b) {
    this[0] = Math.max(this[0], b[0]);
    this[1] = Math.max(this[1], b[1]);
    this[2] = Math.max(this[2], b[2]);
    this[3] = Math.max(this[3], b[3]);
    return this;
  }

  max2(a, b) {
    this[0] = Math.max(a[0], b[0]);
    this[1] = Math.max(a[1], b[1]);
    this[2] = Math.max(a[2], b[2]);
    this[3] = Math.max(a[3], b[3]);
    return this;
  }

  negate() {
    this[0] = -this[0];
    this[1] = -this[1];
    this[2] = -this[2];
    this[3] = -this[3];
    return this;
  }

  zero() {
    this[0] = 0;
    this[1] = 0;
    this[2] = 0;
    this[3] = 0;
    return this;
  }

  inverse() {
    this[0] = 1.0 / this[0];
    this[1] = 1.0 / this[1];
    this[2] = 1.0 / this[2];
    this[3] = 1.0 / this[3];
    return this;
  }

  length() {
    return Math.sqrt(this.lengthSq());
  }

  lengthSq() {
    const x = this[0];
    const y = this[1];
    const z = this[2];
    const w = this[3];
    return x * x + y * y + z * z + w * w;
  }

  distance(b) {
    return Math.sqrt(this.distanceSq(b));
  }

  distanceSq(b) {
    const x = b[0] - this[0];
    const y = b[1] - this[1];
    const z = b[2] - this[2];
    const w = b[3] - this[3];
    return x * x + y * y + z * z + w * w;
  }

  random(scale = 1) {
    scale = scale === undefined ? 1.0 : scale;

    // Marsaglia, George. Choosing a Point from the Surface of a
    // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
    // http://projecteuclid.org/euclid.aoms/1177692644;
    let v1, v2, v3, v4;
    let s1, s2;
    let rand;

    rand = Math.random();
    v1 = rand * 2 - 1;
    v2 = (4 * Math.random() - 2) * Math.sqrt(rand * -rand + rand);
    s1 = v1 * v1 + v2 * v2;

    rand = Math.random();
    v3 = rand * 2 - 1;
    v4 = (4 * Math.random() - 2) * Math.sqrt(rand * -rand + rand);
    s2 = v3 * v3 + v4 * v4;

    let d = Math.sqrt((1 - s1) / s2);
    this[0] = scale * v1;
    this[1] = scale * v2;
    this[2] = scale * v3 * d;
    this[3] = scale * v4 * d;
    return this;
  }

  normalize() {
    const len = this.length() || 1;
    return this.divideScalar(len);
  }

  dot(b) {
    return this[0] * b[0] + this[1] * b[1] + this[2] * b[2] + this[3] * b[3];
  }

  cross(v, w) {
    let A = v[0] * w[1] - v[1] * w[0],
        B = v[0] * w[2] - v[2] * w[0],
        C = v[0] * w[3] - v[3] * w[0],
        D = v[1] * w[2] - v[2] * w[1],
        E = v[1] * w[3] - v[3] * w[1],
        F = v[2] * w[3] - v[3] * w[2];
    let G = this[0];
    let H = this[1];
    let I = this[2];
    let J = this[3];

    this[0] = H * F - I * E + J * D;
    this[1] = -(G * F) + I * C - J * B;
    this[2] = G * E - H * C + J * A;
    this[3] = -(G * D) + H * B - I * A;

    return this;
  }

  cross2(u, v, w) {
    return this.copy(u).cross(v, w);
  }

  lerp(b, t) {
    let ax = this[0];
    let ay = this[1];
    let az = this[2];
    let aw = this[3];
    this[0] = lerp(ax, b[0], t);
    this[1] = lerp(ay, b[1], t);
    this[2] = lerp(az, b[2], t);
    this[3] = lerp(aw, b[3], t);
    return this;
  }

  lerp2(a, b, t) {
    return this.copy(a).lerp(b, t);
  }

  equals(b, epsilon = config.EPSILON) {
    let a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    let b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    return (
        Math.abs(a0 - b0) <= epsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= epsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
        Math.abs(a2 - b2) <= epsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
        Math.abs(a3 - b3) <= epsilon * Math.max(1.0, Math.abs(a3), Math.abs(b3))
    );
  }

  exactEquals(b) {
    return this[0] === b[0] && this[1] === b[1] && this[2] === b[2] && this[3] === b[3];
  }

  fromJSON(d) {
    this[0] = d[0];
    this[1] = d[1];
    this[2] = d[2];
    this[3] = d[3];
    return this;
  }

  toJSON() {
    return [this[0], this[1], this[2], this[3]];
  }
}

Vec4.prototype.isVec4 = true;
Vec4.prototype.sub = Vec4.prototype.subtract;
Vec4.prototype.sub2 = Vec4.prototype.subtract2;
Vec4.prototype.subScalar = Vec4.prototype.subtractScalar;
Vec4.prototype.mul = Vec4.prototype.multiply;
Vec4.prototype.mul2 = Vec4.prototype.multiply2;
Vec4.prototype.mulScalar = Vec4.prototype.multiplyScalar;
Vec4.prototype.div = Vec4.prototype.divide;
Vec4.prototype.div2 = Vec4.prototype.divide2;
Vec4.prototype.divScalar = Vec4.prototype.divideScalar;
