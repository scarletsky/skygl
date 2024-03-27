
export class Mat2 {
  constructor(
    m00 = 1, m01 = 0,
    m10 = 0, m11 = 1) {
    this[0] = m00;
    this[1] = m01;
    this[2] = m10;
    this[3] = m11;
  }

  set(
    m00, m01,
    m10, m11) {
    this[0] = m00;
    this[1] = m01;
    this[2] = m10;
    this[3] = m11;
    return this;
  }

  clone(out = new Mat2()) {
    out[0] = this[0];
    out[1] = this[1];
    out[2] = this[2];
    out[3] = this[3];
    return out;
  }

  copy(b) {
    this[0] = b[0];
    this[1] = b[1];
    this[2] = b[2];
    this[3] = b[3];
    return this;
  }

  identity() {
    this[0] = 1;
    this[1] = 0;
    this[2] = 0;
    this[3] = 1;
    return this;
  }

  determinant() {
    return this[0] * this[3] - this[2] * this[1];
  }

  transpose(out = this) {
    // If we are transposing ourselves we can skip a few steps but have to cache
    // some values
    if (out === this) {
        let a1 = this[1];
        out[1] = this[2];
        out[2] = a1;
    } else {
        out[0] = this[0];
        out[1] = this[2];
        out[2] = this[1];
        out[3] = this[3];
    }

    return out;
  }

  inverse(out = this) {
    let a0 = this[0],
        a1 = this[1],
        a2 = this[2],
        a3 = this[3];

    // Calculate the determinant
    let det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }

    det = 1.0 / det;

    out[0] = a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] = a0 * det;
    return out;
  }

  adjoint(out = this) {
    // Caching this value is necessary if out == a
    let a0 = this[0];
    out[0] = this[3];
    out[1] = -this[1];
    out[2] = -this[2];
    out[3] = a0;
    return out;
  }

  add(b, out = this) {
    out[0] = this[0] + b[0];
    out[1] = this[1] + b[1];
    out[2] = this[2] + b[2];
    out[3] = this[3] + b[3];
    return out;
  }

  add2(a, b, out = this) {
    return this.copy(a).add(b, out);
  }

  subtract(b, out = this) {
    out[0] = this[0] - b[0];
    out[1] = this[1] - b[1];
    out[2] = this[2] - b[2];
    out[3] = this[3] - b[3];
    return out;
  }

  subtract2(a, b, out = this) {
    return this.copy(a).subtract(b, out);
  }

  multiply(b, out = this) {
    let a0 = this[0],
        a1 = this[1],
        a2 = this[2],
        a3 = this[3];
    let b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
  }

  multiply2(a, b, out = this) {
    return this.copy(a).multiply(b, out);
  }

  multiplyScalar(b, out = this) {
    out[0] = this[0] * b;
    out[1] = this[1] * b;
    out[2] = this[2] * b;
    out[3] = this[3] * b;
    return out;
  }

  rotate(rad, out = this) {
    let a0 = this[0],
        a1 = this[1],
        a2 = this[2],
        a3 = this[3];
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
  }

  scale(v, out = this) {
    let a0 = this[0],
        a1 = this[1],
        a2 = this[2],
        a3 = this[3];
    let v0 = v[0],
        v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
  }

  fromRotation(rad, out = this) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
  }

  fromScale(v, out = this) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
  }

  frob() {
    let a00 = this[0],
        a01 = this[1];
    let a10 = this[2],
        a11 = this[3];

    return Math.sqrt(
      a00 * a00 +
      a01 * a01 +
      a10 * a10 +
      a11 * a11
    );
  }

  LDU(L = new Mat2(), D = new Mat2(), U = new Mat2()) {
    let a00 = this[0],
        a01 = this[1];
    let a10 = this[2],
        a11 = this[3];

    L[2] = a10 / a00;
    U[0] = a00;
    U[1] = a01;
    U[3] = a11 - L[2] * U[1];
    return [L, D, U];
  }

  equals(b, epsilon = config.EPSILON) {
    let a0 = this[0],
        a1 = this[1],
        a2 = this[2],
        a3 = this[3];
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

  exactEquals() {
    return this[0] === b[0] && this[1] === b[1] && this[2] === b[2] && this[3] === b[3];
  }

  fromJSON(d) {
    return this.set(d[0], d[1], d[2], d[3]);
  }

  toJSON() {
    return [this[0], this[1], this[2], this[3]];
  }
}

Mat2.prototype.isMat2 = true;
Mat2.prototype.sub = Mat2.prototype.subtract;
Mat2.prototype.mul = Mat2.prototype.multiply;
