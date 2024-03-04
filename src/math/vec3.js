export class Vec3 {
  static create(x, y, z) {
    return new Vec3(x, y, z);
  }

  constructor(x = 0, y = 0, z = 0) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
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

  set(x, y, z) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
    return this;
  }

  clone(res = new Vec3()) {
    res[0] = this[0];
    res[1] = this[1];
    res[2] = this[2];
    return res;
  }

  copy(b) {
    this[0] = b[0];
    this[1] = b[1];
    this[2] = b[2];
    return this;
  }

  add(b) {
    this[0] += b[0];
    this[1] += b[1];
    this[2] += b[2];
    return this;
  }

  add2(a, b) {
    this[0] = a[0] + b[0];
    this[1] = a[1] + b[1];
    this[2] = a[2] + b[2];
    return this;
  }

  addScalar(k) {
    this[0] += k;
    this[1] += k;
    this[2] += k;
    return this;
  }

  subtract(b) {
    this[0] -= b[0];
    this[1] -= b[1];
    this[2] -= b[2];
    return this;
  }

  subtract2(a, b) {
    this[0] = a[0] - b[0];
    this[1] = a[1] - b[1];
    this[2] = a[2] - b[2];
    return this;
  }

  subtractScalar(k) {
    this[0] -= k;
    this[1] -= k;
    this[2] -= k;
    return this;
  }

  multiply(b) {
    this[0] *= b[0];
    this[1] *= b[1];
    this[2] *= b[2];
    return this;
  }

  multiply2(a, b) {
    this[0] = a[0] * b[0];
    this[1] = a[1] * b[1];
    this[2] = a[2] * b[2];
    return this;
  }

  multiplyScalar(k) {
    this[0] *= k;
    this[1] *= k;
    this[2] *= k;
    return this;
  }

  divide(b) {
    this[0] /= b[0];
    this[1] /= b[1];
    this[2] /= b[2];
    return this;
  }

  divide2(a, b) {
    this[0] = a[0] / b[0];
    this[1] = a[1] / b[1];
    this[2] = a[2] / b[2];
    return this;
  }

  divideScalar(k) {
    this[0] /= k;
    this[0] /= k;
    this[0] /= k;
    return this;
  }

  ceil() {
    this[0] = Math.ceil(this[0]);
    this[1] = Math.ceil(this[1]);
    this[2] = Math.ceil(this[2]);
    return this;
  }

  floor() {
    this[0] = Math.floor(this[0]);
    this[1] = Math.floor(this[1]);
    this[2] = Math.floor(this[2]);
    return this;
  }

  round() {
    this[0] = Math.round(this[0]);
    this[1] = Math.round(this[1]);
    this[2] = Math.round(this[2]);
    return this;
  }

  min(b) {
    this[0] = Math.min(this[0], b[0]);
    this[1] = Math.min(this[1], b[1]);
    this[2] = Math.min(this[2], b[2]);
    return this;
  }

  min2(a, b) {
    this[0] = Math.min(a[0], b[0]);
    this[1] = Math.min(a[1], b[1]);
    this[2] = Math.min(a[2], b[2]);
    return this;
  }

  max(b) {
    this[0] = Math.max(this[0], b[0]);
    this[1] = Math.max(this[1], b[1]);
    this[2] = Math.max(this[2], b[2]);
    return this;
  }

  max2(a, b) {
    this[0] = Math.max(a[0], b[0]);
    this[1] = Math.max(a[1], b[1]);
    this[2] = Math.max(a[2], b[2]);
    return this;
  }

  negate() {
    this[0] = -this[0];
    this[1] = -this[1];
    this[2] = -this[2];
    return this;
  }

  zero() {
    this[0] = 0;
    this[1] = 0;
    this[2] = 0;
    return this;
  }

  inverse() {
    this[0] = 1.0 / this[0];
    this[1] = 1.0 / this[1];
    this[2] = 1.0 / this[2];
    return this;
  }

  length() {
    return Math.sqrt(this.length());
  }

  lengthSq() {
    const x = this[0];
    const y = this[1];
    const z = this[2];
    return x * x + y * y + z * z;
  }

  distance(b) {
    return Math.sqrt(this.distanceSq(b));
  }

  distanceSq(b) {
    const x = b[0] - this[0];
    const y = b[1] - this[1];
    const z = b[2] - this[2];
    return x * x + y * y + z * z;
  }

  random(scale = 1) {
    const r = Math.random() * 2.0 * Math.PI;
    const z = Math.random() * 2.0 - 1.0;
    const zScale = Math.sqrt(1.0 - z * z) * scale;

    this[0] = Math.cos(r) * zScale;
    this[1] = Math.sin(r) * zScale;
    this[2] = z * scale;
    return this;
  }

  normalize() {
    const len = this.length() || 1;
    return this.divideScalar(len);
  }

  dot(b) {
    return this[0] * b[0] + this[1] * b[1] + this[2] * b[2];
  }

  cross(b) {
    const ax = this[0];
    const ay = this[1];
    const az = this[2];
    const bx = b[0];
    const by = b[1];
    const bz = b[2];
    this[0] = ay * bz - az * by;
    this[1] = az * bx - ax * bz;
    this[2] = ax * by - ay * bx;
    return this;
  }

  cross2(a, b) {
    return this.copy(a).cross(b);
  }

  lerp(b, t) {
    const ax = this[0];
    const ay = this[1];
    const az = this[2];
    this[0] = ax + t * (b[0] - ax);
    this[1] = ay + t * (b[1] - ay);
    this[2] = az + t * (b[2] - az);
    return this;
  }

  lerp2(a, b, t) {
    return this.copy(a).lerp(b, t);
  }

  slerp(b, t) {
    let angle = Math.acos(Math.min(Math.max(this.dot(b), -1), 1));
    let sinTotal = Math.sin(angle);

    let ratioA = Math.sin((1 - t) * angle) / sinTotal;
    let ratioB = Math.sin(t * angle) / sinTotal;
    this[0] = ratioA * this[0] + ratioB * b[0];
    this[1] = ratioA * this[1] + ratioB * b[1];
    this[2] = ratioA * this[2] + ratioB * b[2];
    return this;
  }

  slerp2(a, b, t) {
    return this.copy(a).slerp(b, t);
  }

  angle(b) {
    let ax = this[0],
        ay = this[1],
        az = this[2],
        bx = b[0],
        by = b[1],
        bz = b[2],
        mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz)),
        cosine = mag && dot(a, b) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }

  equals(b, epsilon = 1e-6) {
    let a0 = this[0],
        a1 = this[1],
        a2 = this[2];
    let b0 = b[0],
        b1 = b[1],
        b2 = b[2];
    return (
        Math.abs(a0 - b0) <= epsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
        Math.abs(a1 - b1) <= epsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
        Math.abs(a2 - b2) <= epsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2))
    );
  }

  hermite(a, b, c, d, t) {
    let factorTimes2 = t * t;
    let factor1 = factorTimes2 * (2 * t - 3) + 1;
    let factor2 = factorTimes2 * (t - 2) + t;
    let factor3 = factorTimes2 * (t - 1);
    let factor4 = factorTimes2 * (3 - 2 * t);

    this[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    this[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    this[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return this;
  }

  bezier(a, b, c, d, t) {
    let inverseFactor = 1 - t;
    let inverseFactorTimesTwo = inverseFactor * inverseFactor;
    let factorTimes2 = t * t;
    let factor1 = inverseFactorTimesTwo * inverseFactor;
    let factor2 = 3 * t * inverseFactorTimesTwo;
    let factor3 = 3 * factorTimes2 * inverseFactor;
    let factor4 = factorTimes2 * t;

    this[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    this[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    this[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return this;
  }

  transformMat4(m) {
    let x = this[0],
        y = this[1],
        z = this[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    this[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    this[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    this[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  }

  transformMat3(m) {
    let x = a[0],
        y = a[1],
        z = a[2];
    this[0] = x * m[0] + y * m[3] + z * m[6];
    this[1] = x * m[1] + y * m[4] + z * m[7];
    this[2] = x * m[2] + y * m[5] + z * m[8];
    return this;
  }

  transformQuat(q) {
    // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
    let qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3];
    let x = this[0],
        y = this[1],
        z = this[2];
    // var qvec = [qx, qy, qz];
    // var uv = vec3.cross([], qvec, a);
    let uvx = qy * z - qz * y,
        uvy = qz * x - qx * z,
        uvz = qx * y - qy * x;
    // var uuv = vec3.cross([], qvec, uv);
    let uuvx = qy * uvz - qz * uvy,
        uuvy = qz * uvx - qx * uvz,
        uuvz = qx * uvy - qy * uvx;
    // vec3.scale(uv, uv, 2 * w);
    let w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;
    // vec3.scale(uuv, uuv, 2);
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;
    // return vec3.add(out, a, vec3.add(out, uv, uuv));
    this[0] = x + uvx + uuvx;
    this[1] = y + uvy + uuvy;
    this[2] = z + uvz + uuvz;
    return this;
  }

  fromJSON(d) {
    return this.set(d[0], d[1], d[2]);
  }

  toJSON() {
    return [this[0], this[1], this[2]];
  }
}

Vec3.prototype.isVec3 = true;
