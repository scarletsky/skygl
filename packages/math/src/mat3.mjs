export class Mat3 {
  constructor(
    m00 = 1, m01 = 0, m02 = 0,
    m10 = 0, m11 = 1, m12 = 0,
    m20 = 0, m21 = 0, m22 = 1) {
    this[0] = m00;
    this[1] = m01;
    this[2] = m02;
    this[3] = m10;
    this[4] = m11;
    this[5] = m12;
    this[6] = m20;
    this[7] = m21;
    this[8] = m22;
  }

  set(
    m00, m01, m02,
    m10, m11, m12,
    m20, m21, m22) {
    this[0] = m00;
    this[1] = m01;
    this[2] = m02;
    this[3] = m10;
    this[4] = m11;
    this[5] = m12;
    this[6] = m20;
    this[7] = m21;
    this[8] = m22;
    return this;
  }

  clone(out = new Mat3()) {
    out[0] = this[0];
    out[1] = this[1];
    out[2] = this[2];
    out[3] = this[3];
    out[4] = this[4];
    out[5] = this[5];
    out[6] = this[6];
    out[7] = this[7];
    out[8] = this[8];
    return out;
  }

  copy(b) {
    this[0] = b[0];
    this[1] = b[1];
    this[2] = b[2];
    this[3] = b[3];
    this[4] = b[4];
    this[5] = b[5];
    this[6] = b[6];
    this[7] = b[7];
    this[8] = b[8];
    return b;
  }

  identity() {
    this[0] = 1;
    this[1] = 0;
    this[2] = 0;
    this[3] = 0;
    this[4] = 1;
    this[5] = 0;
    this[6] = 0;
    this[7] = 0;
    this[8] = 1;
    return this;
  }

  determinant() {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2];
    let a10 = this[3],
        a11 = this[4],
        a12 = this[5];
    let a20 = this[6],
        a21 = this[7],
        a22 = this[8];

    return (
      a00 * (a22 * a11 - a12 * a21) +
      a01 * (-a22 * a10 + a12 * a20) +
      a02 * (a21 * a10 - a11 * a20)
    );
  }

  transpose(out) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (!out) {
      out = this;
      let a01 = this[1],
        a02 = this[2],
        a12 = this[5];
      out[1] = this[3];
      out[2] = this[6];
      out[3] = a01;
      out[5] = this[7];
      out[6] = a02;
      out[7] = a12;
    } else {
      out[0] = this[0];
      out[1] = this[3];
      out[2] = this[6];
      out[3] = this[1];
      out[4] = this[4];
      out[5] = this[7];
      out[6] = this[2];
      out[7] = this[5];
      out[8] = this[8];
    }

    return out;
  }

  inverse(out = this) {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2];
    let a10 = this[3],
        a11 = this[4],
        a12 = this[5];
    let a20 = this[6],
        a21 = this[7],
        a22 = this[8];

    let b01 = a22 * a11 - a12 * a21;
    let b11 = -a22 * a10 + a12 * a20;
    let b21 = a21 * a10 - a11 * a20;

    // Calculate the determinant
    let det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;

    return out;
  }

  ajoint(out = this) {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2];
    let a10 = this[3],
        a11 = this[4],
        a12 = this[5];
    let a20 = this[6],
        a21 = this[7],
        a22 = this[8];

    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
  }

  projection(width, height, out = this) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
  }

  frob(a) {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2];
    let a10 = this[3],
        a11 = this[4],
        a12 = this[5];
    let a20 = this[6],
        a21 = this[7],
        a22 = this[8];

    return Math.sqrt(
      a00 * a00 +
      a01 * a01 +
      a02 * a02 +
      a10 * a10 +
      a11 * a11 +
      a12 * a12 +
      a20 * a20 +
      a21 * a21 +
      a22 * a22
    );
  }

  add(b, out = this) {
    out[0] = this[0] + b[0];
    out[1] = this[1] + b[1];
    out[2] = this[2] + b[2];
    out[3] = this[3] + b[3];
    out[4] = this[4] + b[4];
    out[5] = this[5] + b[5];
    out[6] = this[6] + b[6];
    out[7] = this[7] + b[7];
    out[8] = this[8] + b[8];
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
    out[4] = this[4] - b[4];
    out[5] = this[5] - b[5];
    out[6] = this[6] - b[6];
    out[7] = this[7] - b[7];
    out[8] = this[8] - b[8];
    return out;
  }

  subtract2(a, b, out = this) {
    return this.copy(a).subtract(b, out);
  }

  multiply(b, out = this) {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2];
    let a10 = this[3],
        a11 = this[4],
        a12 = this[5];
    let a20 = this[6],
        a21 = this[7],
        a22 = this[8];

    let b00 = b[0],
        b01 = b[1],
        b02 = b[2];
    let b10 = b[3],
        b11 = b[4],
        b12 = b[5];
    let b20 = b[6],
        b21 = b[7],
        b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }

  multiply2(a, b, out = this) {
    return this.copy(a).multiply2(b, out);
  }

  multiplyScalar(b, out = this) {
    out[0] = this[0] * b;
    out[1] = this[1] * b;
    out[2] = this[2] * b;
    out[3] = this[3] * b;
    out[4] = this[4] * b;
    out[5] = this[5] * b;
    out[6] = this[6] * b;
    out[7] = this[7] * b;
    out[8] = this[8] * b;
    return out;
  }

  translate(v, out = this) {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2],
        a10 = this[3],
        a11 = this[4],
        a12 = this[5],
        a20 = this[6],
        a21 = this[7],
        a22 = this[8],
        x = v[0],
        y = v[1];

    if (out !== this) {
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a10;
      out[4] = a11;
      out[5] = a12;
    }

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;

    return out;
  }

  rotate(rad, out = this) {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2],
        a10 = this[3],
        a11 = this[4],
        a12 = this[5],
        a20 = this[6],
        a21 = this[7],
        a22 = this[8],
        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    if (out !== this) {
      out[6] = a20;
      out[7] = a21;
      out[8] = a22;
    }
    return out;
  }

  scale(v, out = this) {
    let x = v[0],
        y = v[1];

    out[0] = x * this[0];
    out[1] = x * this[1];
    out[2] = x * this[2];

    out[3] = y * this[3];
    out[4] = y * this[4];
    out[5] = y * this[5];

    if (out !== this) {
      out[6] = this[6];
      out[7] = this[7];
      out[8] = this[8];
    }

    return this;
  }

  fromTranslation(v, out = this) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return this;
  }

  fromRotation(rad, out = this) {
    let s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;

    return out;
  }

  fromScale(v, out = this) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }

  fromMat2D(a, out = this) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return this;
  }

  fromQuat(q, out = this) {
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
  }

  equals(b, epsilon = config.EPSILON) {
    let a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8];
    let b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7],
        b8 = b[8];
    return (
      Math.abs(a0 - b0) <= epsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
      Math.abs(a1 - b1) <= epsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
      Math.abs(a2 - b2) <= epsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
      Math.abs(a3 - b3) <= epsilon * Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
      Math.abs(a4 - b4) <= epsilon * Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
      Math.abs(a5 - b5) <= epsilon * Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
      Math.abs(a6 - b6) <= epsilon * Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
      Math.abs(a7 - b7) <= epsilon * Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
      Math.abs(a8 - b8) <= epsilon * Math.max(1.0, Math.abs(a8), Math.abs(b8))
    );
  }

  exactEquals(b) {
    return (
      this[0] === b[0] &&
      this[1] === b[1] &&
      this[2] === b[2] &&
      this[3] === b[3] &&
      this[4] === b[4] &&
      this[5] === b[5] &&
      this[6] === b[6] &&
      this[7] === b[7] &&
      this[8] === b[8]
    )
  }

  fromJSON(d) {
    return this.set(
      d[0], d[1], d[2],
      d[3], d[4], d[5],
      d[6], d[7], d[8]
    );
  }

  toJSON() {
    return [
      this[0], this[1], this[2],
      this[3], this[4], this[5],
      this[6], this[7], this[8]
    ];
  }
}

Mat3.prototype.isMat3 = true;
Mat3.prototype.sub = Mat3.prototype.subtract;
Mat3.prototype.mul = Mat3.prototype.multiply;
