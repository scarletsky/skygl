import { config } from './common.mjs';
import { Mat3 } from './mat3.mjs';

export class Mat4 {
  constructor(
    m00 = 1, m01 = 0, m02 = 0, m03 = 0,
    m10 = 0, m11 = 1, m12 = 0, m13 = 0,
    m20 = 0, m21 = 0, m22 = 1, m23 = 0,
    m30 = 0, m31 = 0, m32 = 0, m33 = 1) {
    this[0] = m00;
    this[1] = m01;
    this[2] = m02;
    this[3] = m03;
    this[4] = m10;
    this[5] = m11;
    this[6] = m12;
    this[7] = m13;
    this[8] = m20;
    this[9] = m21;
    this[10] = m22;
    this[11] = m23;
    this[12] = m30;
    this[13] = m31;
    this[14] = m32;
    this[15] = m33;
  }

  clone(out = new Mat4()) {
    out[0] = this[0];
    out[1] = this[1];
    out[2] = this[2];
    out[3] = this[3];
    out[4] = this[4];
    out[5] = this[5];
    out[6] = this[6];
    out[7] = this[7];
    out[8] = this[8];
    out[9] = this[9];
    out[10] = this[10];
    out[11] = this[11];
    out[12] = this[12];
    out[13] = this[13];
    out[14] = this[14];
    out[15] = this[15];
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
    this[9] = b[9];
    this[10] = b[10];
    this[11] = b[11];
    this[12] = b[12];
    this[13] = b[13];
    this[14] = b[14];
    this[15] = b[15];
    return this;
  }

  set(
    m00, m01, m02, m03,
    m10, m11, m12, m13,
    m20, m21, m22, m23,
    m30, m31, m32, m33) {
    this[0] = m00;
    this[1] = m01;
    this[2] = m02;
    this[3] = m03;
    this[4] = m10;
    this[5] = m11;
    this[6] = m12;
    this[7] = m13;
    this[8] = m20;
    this[9] = m21;
    this[10] = m22;
    this[11] = m23;
    this[12] = m30;
    this[13] = m31;
    this[14] = m32;
    this[15] = m33;
    return this;
  }

  identity() {
    this[0] = 1;
    this[1] = 0;
    this[2] = 0;
    this[3] = 0;
    this[4] = 0;
    this[5] = 1;
    this[6] = 0;
    this[7] = 0;
    this[8] = 0;
    this[9] = 0;
    this[10] = 1;
    this[11] = 0;
    this[12] = 0;
    this[13] = 0;
    this[14] = 0;
    this[15] = 1;
    return this;
  }

  frustum(left, right, bottom, top, near, far) {
    let rl = 1 / (right - left);
    let tb = 1 / (top - bottom);
    let nf = 1 / (near - far);
    this[0] = near * 2 * rl;
    this[1] = 0;
    this[2] = 0;
    this[3] = 0;
    this[4] = 0;
    this[5] = near * 2 * tb;
    this[6] = 0;
    this[7] = 0;
    this[8] = (right + left) * rl;
    this[9] = (top + bottom) * tb;
    this[10] = (far + near) * nf;
    this[11] = -1;
    this[12] = 0;
    this[13] = 0;
    this[14] = far * near * 2 * nf;
    this[15] = 0;
    return this;
  }

  /**
   * NO (Negative to One)
   * Z range is [-1, 1], which matches WebGL/OpenGL's clip volume.
   */
  perspectiveNO(fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(fovy / 2);
    this[0] = f / aspect;
    this[1] = 0;
    this[2] = 0;
    this[3] = 0;
    this[4] = 0;
    this[5] = f;
    this[6] = 0;
    this[7] = 0;
    this[8] = 0;
    this[9] = 0;
    this[11] = -1;
    this[12] = 0;
    this[13] = 0;
    this[15] = 0;
    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      this[10] = (far + near) * nf;
      this[14] = 2 * far * near * nf;
    } else {
      this[10] = -1;
      this[14] = -2 * near;
    }
    return this;
  }

  /**
   * ZO (Zero to One)
   * Z range is [0, 1], which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
   */
  perspectiveZO(fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(fovy / 2);
    this[0] = f / aspect;
    this[1] = 0;
    this[2] = 0;
    this[3] = 0;
    this[4] = 0;
    this[5] = f;
    this[6] = 0;
    this[7] = 0;
    this[8] = 0;
    this[9] = 0;
    this[11] = -1;
    this[12] = 0;
    this[13] = 0;
    this[15] = 0;
    if (far != null && far !== Infinity) {
      const nf = 1 / (near - far);
      this[10] = far * nf;
      this[14] = far * near * nf;
    } else {
      this[10] = -1;
      this[14] = -near;
    }
    return this;
  }

  orthographicNO(left, right, bottom, top, near, far) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    this[0] = -2 * lr;
    this[1] = 0;
    this[2] = 0;
    this[3] = 0;
    this[4] = 0;
    this[5] = -2 * bt;
    this[6] = 0;
    this[7] = 0;
    this[8] = 0;
    this[9] = 0;
    this[10] = 2 * nf;
    this[11] = 0;
    this[12] = (left + right) * lr;
    this[13] = (top + bottom) * bt;
    this[14] = (far + near) * nf;
    this[15] = 1;
    return this;
  }

  orthographicZO(left, right, bottom, top, near, fat) {
    const lr = 1 / (left - right);
    const bt = 1 / (bottom - top);
    const nf = 1 / (near - far);
    this[0] = -2 * lr;
    this[1] = 0;
    this[2] = 0;
    this[3] = 0;
    this[4] = 0;
    this[5] = -2 * bt;
    this[6] = 0;
    this[7] = 0;
    this[8] = 0;
    this[9] = 0;
    this[10] = nf;
    this[11] = 0;
    this[12] = (left + right) * lr;
    this[13] = (top + bottom) * bt;
    this[14] = near * nf;
    this[15] = 1;
    return this;
  }

  determinant() {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2],
        a03 = this[3];
    let a10 = this[4],
        a11 = this[5],
        a12 = this[6],
        a13 = this[7];
    let a20 = this[8],
        a21 = this[9],
        a22 = this[10],
        a23 = this[11];
    let a30 = this[12],
        a31 = this[13],
        a32 = this[14],
        a33 = this[15];

    let b0 = a00 * a11 - a01 * a10;
    let b1 = a00 * a12 - a02 * a10;
    let b2 = a01 * a12 - a02 * a11;
    let b3 = a20 * a31 - a21 * a30;
    let b4 = a20 * a32 - a22 * a30;
    let b5 = a21 * a32 - a22 * a31;
    let b6 = a00 * b5 - a01 * b4 + a02 * b3;
    let b7 = a10 * b5 - a11 * b4 + a12 * b3;
    let b8 = a20 * b2 - a21 * b1 + a22 * b0;
    let b9 = a30 * b2 - a31 * b1 + a32 * b0;

    return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
  }

  inverse(out = this) {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2],
        a03 = this[3];
    let a10 = this[4],
        a11 = this[5],
        a12 = this[6],
        a13 = this[7];
    let a20 = this[8],
        a21 = this[9],
        a22 = this[10],
        a23 = this[11];
    let a30 = this[12],
        a31 = this[13],
        a32 = this[14],
        a33 = this[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    let det =
        b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
  }

  adjoint(out = this) {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2],
        a03 = this[3];
    let a10 = this[4],
        a11 = this[5],
        a12 = this[6],
        a13 = this[7];
    let a20 = this[8],
        a21 = this[9],
        a22 = this[10],
        a23 = this[11];
    let a30 = this[12],
        a31 = this[13],
        a32 = this[14],
        a33 = this[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    out[0] = a11 * b11 - a12 * b10 + a13 * b09;
    out[1] = a02 * b10 - a01 * b11 - a03 * b09;
    out[2] = a31 * b05 - a32 * b04 + a33 * b03;
    out[3] = a22 * b04 - a21 * b05 - a23 * b03;
    out[4] = a12 * b08 - a10 * b11 - a13 * b07;
    out[5] = a00 * b11 - a02 * b08 + a03 * b07;
    out[6] = a32 * b02 - a30 * b05 - a33 * b01;
    out[7] = a20 * b05 - a22 * b02 + a23 * b01;
    out[8] = a10 * b10 - a11 * b08 + a13 * b06;
    out[9] = a01 * b08 - a00 * b10 - a03 * b06;
    out[10] = a30 * b04 - a31 * b02 + a33 * b00;
    out[11] = a21 * b02 - a20 * b04 - a23 * b00;
    out[12] = a11 * b07 - a10 * b09 - a12 * b06;
    out[13] = a00 * b09 - a01 * b07 + a02 * b06;
    out[14] = a31 * b01 - a30 * b03 - a32 * b00;
    out[15] = a20 * b03 - a21 * b01 + a22 * b00;

    return out;
  }

  transpose(out) {
    if (!out) {
      out = this;
      let a01 = this[1],
          a02 = this[2],
          a03 = this[3];
      let a12 = this[6],
          a13 = this[7];
      let a23 = this[11];

      out[1] = this[4];
      out[2] = this[8];
      out[3] = this[12];
      out[4] = a01;
      out[6] = this[9];
      out[7] = this[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = this[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = this[0];
      out[1] = this[4];
      out[2] = this[8];
      out[3] = this[12];
      out[4] = this[1];
      out[5] = this[5];
      out[6] = this[9];
      out[7] = this[13];
      out[8] = this[2];
      out[9] = this[6];
      out[10] = this[10];
      out[11] = this[14];
      out[12] = this[3];
      out[13] = this[7];
      out[14] = this[11];
      out[15] = this[15];
    }

    return out;
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
    out[9] = this[9] + b[9];
    out[10] = this[10] + b[10];
    out[11] = this[11] + b[11];
    out[12] = this[12] + b[12];
    out[13] = this[13] + b[13];
    out[14] = this[14] + b[14];
    out[15] = this[15] + b[15];
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
    out[9] = this[9] - b[9];
    out[10] = this[10] - b[10];
    out[11] = this[11] - b[11];
    out[12] = this[12] - b[12];
    out[13] = this[13] - b[13];
    out[14] = this[14] - b[14];
    out[15] = this[15] - b[15];
    return out;
  }

  subtract2(a, b, out = this) {
    return this.copy(a).subtract(b, out);
  }

  multiply(b, out = this) {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2],
        a03 = this[3];
    let a10 = this[4],
        a11 = this[5],
        a12 = this[6],
        a13 = this[7];
    let a20 = this[8],
        a21 = this[9],
        a22 = this[10],
        a23 = this[11];
    let a30 = this[12],
        a31 = this[13],
        a32 = this[14],
        a33 = this[15];

    // Cache only the current line of the second matrix
    let b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }

  multiply2(a, b, out = this) {
    return this.copy(a).multiply(b, out);
  }

  translate(v, out = this) {
    let a00 = this[0],
      a01 = this[1],
      a02 = this[2],
      a03 = this[3],
      a10 = this[4],
      a11 = this[5],
      a12 = this[6],
      a13 = this[7],
      a20 = this[8],
      a21 = this[9],
      a22 = this[10],
      a23 = this[11];

    let x = v[0],
        y = v[1],
        z = v[2];

    if (out !== this) {
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
    }

    out[12] = a00 * x + a10 * y + a20 * z + this[12];
    out[13] = a01 * x + a11 * y + a21 * z + this[13];
    out[14] = a02 * x + a12 * y + a22 * z + this[14];
    out[15] = a03 * x + a13 * y + a23 * z + this[15];

    return out;
  }

  scale(v, out = this) {
    let x = v[0],
        y = v[1],
        z = v[2];

    out[0] = this[0] * x;
    out[1] = this[1] * x;
    out[2] = this[2] * x;
    out[3] = this[3] * x;
    out[4] = this[4] * y;
    out[5] = this[5] * y;
    out[6] = this[6] * y;
    out[7] = this[7] * y;
    out[8] = this[8] * z;
    out[9] = this[9] * z;
    out[10] = this[10] * z;
    out[11] = this[11] * z;

    if (out !== this) {
      out[12] = this[12];
      out[13] = this[13];
      out[14] = this[14];
      out[15] = this[15];
    }

    return out;
  }

  rotate(axis, rad, out = this) {
    let x = axis[0],
      y = axis[1],
      z = axis[2];
    let len = Math.sqrt(x * x + y * y + z * z);
    let s, c, t;
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;

    if (len < config.EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = this[0];
    a01 = this[1];
    a02 = this[2];
    a03 = this[3];
    a10 = this[4];
    a11 = this[5];
    a12 = this[6];
    a13 = this[7];
    a20 = this[8];
    a21 = this[9];
    a22 = this[10];
    a23 = this[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (out !== this) {
      // If the source and destination differ, copy the unchanged last row
      out[12] = this[12];
      out[13] = this[13];
      out[14] = this[14];
      out[15] = this[15];
    }

    return out;
  }

  rotateX(rad, out = this) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let a10 = this[4];
    let a11 = this[5];
    let a12 = this[6];
    let a13 = this[7];
    let a20 = this[8];
    let a21 = this[9];
    let a22 = this[10];
    let a23 = this[11];

    if (out !== this) {
      // If the source and destination differ, copy the unchanged rows
      out[0] = this[0];
      out[1] = this[1];
      out[2] = this[2];
      out[3] = this[3];
      out[12] = this[12];
      out[13] = this[13];
      out[14] = this[14];
      out[15] = this[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }

  rotateY(rad, out = this) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let a00 = this[0];
    let a01 = this[1];
    let a02 = this[2];
    let a03 = this[3];
    let a20 = this[8];
    let a21 = this[9];
    let a22 = this[10];
    let a23 = this[11];

    if (out !== this) {
      // If the source and destination differ, copy the unchanged rows
      out[4] = this[4];
      out[5] = this[5];
      out[6] = this[6];
      out[7] = this[7];
      out[12] = this[12];
      out[13] = this[13];
      out[14] = this[14];
      out[15] = this[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }

  rotateZ(rad, out = this) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let a00 = this[0];
    let a01 = this[1];
    let a02 = this[2];
    let a03 = this[3];
    let a10 = this[4];
    let a11 = this[5];
    let a12 = this[6];
    let a13 = this[7];

    if (out !== this) {
      // If the source and destination differ, copy the unchanged last row
      out[8] = this[8];
      out[9] = this[9];
      out[10] = this[10];
      out[11] = this[11];
      out[12] = this[12];
      out[13] = this[13];
      out[14] = this[14];
      out[15] = this[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }

  frob() {
    let a00 = this[0],
        a01 = this[1],
        a02 = this[2],
        a03 = this[3];
    let a10 = this[4],
        a11 = this[5],
        a12 = this[6],
        a13 = this[7];
    let a20 = this[8],
        a21 = this[9],
        a22 = this[10],
        a23 = this[11];
    let a30 = this[12],
        a31 = this[13],
        a32 = this[14],
        a33 = this[15];

    return Math.sqrt(
      a00 * a00 +
      a01 * a01 +
      a02 * a02 +
      a03 * a03 +
      a10 * a10 +
      a11 * a11 +
      a12 * a12 +
      a13 * a13 +
      a20 * a20 +
      a21 * a21 +
      a22 * a22 +
      a23 * a23 +
      a30 * a30 +
      a31 * a31 +
      a32 * a32 +
      a33 * a33
    );
  }

  fromTranslation(v, out = this) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }

  fromScale(v, out = this) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  fromRotation(axis, rad, out = this) {
    let x = axis[0],
      y = axis[1],
      z = axis[2];
    let len = Math.sqrt(x * x + y * y + z * z);
    let s, c, t;

    if (len < config.EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  fromXRotation(rad, out = this) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  fromYRotation(rad, out = this) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  fromZRotation(rad, out = this) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }

  /**
   * Equals:
   *   m.identity();
   *   m.multiply(new Mat4().fromQuat(q));
   *   m.translate(v);
   */
  fromRotationTraslation(q, v, out = this) {
    // Quaternion math
    let x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
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
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
  }

  fromJSON(d) {
    return this.set(
      d[0],  d[1],  d[2],  d[3],
      d[4],  d[5],  d[6],  d[7],
      d[8],  d[9],  d[10], d[11],
      d[12], d[13], d[14], d[15],
    );
  }

  toJSON() {
    return [
      this[0],  this[1],  this[2],  this[3],
      this[4],  this[5],  this[6],  this[7],
      this[8],  this[9],  this[10], this[11],
      this[12], this[13], this[14], this[15],
    ];
  }

  toNormalMat3(out = new Mat3()) {
    let a00 = this[0],
      a01 = this[1],
      a02 = this[2],
      a03 = this[3];
    let a10 = this[4],
      a11 = this[5],
      a12 = this[6],
      a13 = this[7];
    let a20 = this[8],
      a21 = this[9],
      a22 = this[10],
      a23 = this[11];
    let a30 = this[12],
      a31 = this[13],
      a32 = this[14],
      a33 = this[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    let det =
      b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
  }
}

Mat4.prototype.isMat4 = true;
Mat4.prototype.perspective = Mat4.prototype.perspectiveNO;
Mat4.prototype.orthographic = Mat4.prototype.orthographicNO;
Mat4.prototype.ortho = Mat4.prototype.orthographic;
Mat4.prototype.sub = Mat4.prototype.subtract;
Mat4.prototype.mul = Mat4.prototype.multiply;
