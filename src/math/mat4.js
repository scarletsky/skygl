export class Mat4 {
  constructor(
    v00 = 1, v01 = 0, v02 = 0, v03 = 0,
    v10 = 0, v11 = 1, v12 = 0, v13 = 0,
    v20 = 0, v21 = 0, v22 = 1, v23 = 0,
    v30 = 0, v31 = 0, v32 = 0, v33 = 1) {
    this[0] = v00;
    this[1] = v01;
    this[2] = v02;
    this[3] = v03;
    this[4] = v10;
    this[5] = v11;
    this[6] = v12;
    this[7] = v13;
    this[8] = v20;
    this[9] = v21;
    this[10] = v22;
    this[11] = v23;
    this[12] = v30;
    this[13] = v31;
    this[14] = v32;
    this[15] = v33;
  }

  clone(res = new Mat4()) {
    res[0] = this[0];
    res[1] = this[1];
    res[2] = this[2];
    res[3] = this[3];
    res[4] = this[4];
    res[5] = this[5];
    res[6] = this[6];
    res[7] = this[7];
    res[8] = this[8];
    res[9] = this[9];
    res[10] = this[10];
    res[11] = this[11];
    res[12] = this[12];
    res[13] = this[13];
    res[14] = this[14];
    res[15] = this[15];
    return res;
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
    v00, v01, v02, v03,
    v10, v11, v12, v13,
    v20, v21, v22, v23,
    v30, v31, v32, v33) {
    this[0] = v00;
    this[1] = v01;
    this[2] = v02;
    this[3] = v03;
    this[4] = v10;
    this[5] = v11;
    this[6] = v12;
    this[7] = v13;
    this[8] = v20;
    this[9] = v21;
    this[10] = v22;
    this[11] = v23;
    this[12] = v30;
    this[13] = v31;
    this[14] = v32;
    this[15] = v33;
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

  invert(res) {
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

    if (!res) res = this;

    res[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    res[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    res[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    res[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    res[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    res[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    res[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    res[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    res[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    res[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    res[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    res[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    res[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    res[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    res[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    res[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return res;
  }

  adjoint(res) {
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

    if (!res) {
      res = this;
    }

    res[0] = a11 * b11 - a12 * b10 + a13 * b09;
    res[1] = a02 * b10 - a01 * b11 - a03 * b09;
    res[2] = a31 * b05 - a32 * b04 + a33 * b03;
    res[3] = a22 * b04 - a21 * b05 - a23 * b03;
    res[4] = a12 * b08 - a10 * b11 - a13 * b07;
    res[5] = a00 * b11 - a02 * b08 + a03 * b07;
    res[6] = a32 * b02 - a30 * b05 - a33 * b01;
    res[7] = a20 * b05 - a22 * b02 + a23 * b01;
    res[8] = a10 * b10 - a11 * b08 + a13 * b06;
    res[9] = a01 * b08 - a00 * b10 - a03 * b06;
    res[10] = a30 * b04 - a31 * b02 + a33 * b00;
    res[11] = a21 * b02 - a20 * b04 - a23 * b00;
    res[12] = a11 * b07 - a10 * b09 - a12 * b06;
    res[13] = a00 * b09 - a01 * b07 + a02 * b06;
    res[14] = a31 * b01 - a30 * b03 - a32 * b00;
    res[15] = a20 * b03 - a21 * b01 + a22 * b00;

    return res;
  }

  transpose(res) {
    if (!res) {
      res = this;
      let a01 = this[1],
          a02 = this[2],
          a03 = this[3];
      let a12 = this[6],
          a13 = this[7];
      let a23 = this[11];

      res[1] = this[4];
      res[2] = this[8];
      res[3] = this[12];
      res[4] = a01;
      res[6] = this[9];
      res[7] = this[13];
      res[8] = a02;
      res[9] = a12;
      res[11] = this[14];
      res[12] = a03;
      res[13] = a13;
      res[14] = a23;
    } else {
      res[0] = this[0];
      res[1] = this[4];
      res[2] = this[8];
      res[3] = this[12];
      res[4] = this[1];
      res[5] = this[5];
      res[6] = this[9];
      res[7] = this[13];
      res[8] = this[2];
      res[9] = this[6];
      res[10] = this[10];
      res[11] = this[14];
      res[12] = this[3];
      res[13] = this[7];
      res[14] = this[11];
      res[15] = this[15];
    }

    return res;
  }

  multiply(b) {
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
    this[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    this[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    this[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    this[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return this;
  }

  multiply2(a, b) {
    return this.copy(a).multiply(b);
  }

  translate(v, res) {
    let x = v[0],
        y = v[1],
        z = v[2];
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;

    if (!res) {
      res = this;
      res[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      res[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      res[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      res[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];

      res[0] = a00;
      res[1] = a01;
      res[2] = a02;
      res[3] = a03;
      res[4] = a10;
      res[5] = a11;
      res[6] = a12;
      res[7] = a13;
      res[8] = a20;
      res[9] = a21;
      res[10] = a22;
      res[11] = a23;

      res[12] = a00 * x + a10 * y + a20 * z + a[12];
      res[13] = a01 * x + a11 * y + a21 * z + a[13];
      res[14] = a02 * x + a12 * y + a22 * z + a[14];
      res[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return res;
  }

  scale(v, res) {
    if (!res) res = this;

    let x = v[0],
        y = v[1],
        z = v[2];

    res[0] = a[0] * x;
    res[1] = a[1] * x;
    res[2] = a[2] * x;
    res[3] = a[3] * x;
    res[4] = a[4] * y;
    res[5] = a[5] * y;
    res[6] = a[6] * y;
    res[7] = a[7] * y;
    res[8] = a[8] * z;
    res[9] = a[9] * z;
    res[10] = a[10] * z;
    res[11] = a[11] * z;
    res[12] = a[12];
    res[13] = a[13];
    res[14] = a[14];
    res[15] = a[15];
    return res;
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
}

Mat4.prototype.isMat4 = true;
