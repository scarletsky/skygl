export class Mat3 {
  constructor(
    v0, v1, v2,
    v3, v4, v5,
    v6, v7, v8
  ) {
    this[0] = v0;
    this[1] = v1;
    this[2] = v2;
    this[3] = v3;
    this[4] = v4;
    this[5] = v5;
    this[6] = v6;
    this[7] = v7;
    this[8] = v8;
  }
}

Mat3.prototype.isMat3 = true;
