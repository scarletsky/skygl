import { Vec3 } from './vec3.mjs';
import { Vec4 } from './vec4.mjs';
import { config } from './common.mjs';

export class Quat {
  constructor(x, y, z, w) {
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

  clone(out = new Quat()) {
    return out.copy(this);
  }

  identity() {
    this[0] = 0;
    this[1] = 0;
    this[2] = 0;
    this[3] = 1;
    return this;
  }

  multiply(b) {
    let ax = this[0],
      ay = this[1],
      az = this[2],
      aw = this[3];
    let bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];

    this[0] = ax * bw + aw * bx + ay * bz - az * by;
    this[1] = ay * bw + aw * by + az * bx - ax * bz;
    this[2] = az * bw + aw * bz + ax * by - ay * bx;
    this[3] = aw * bw - ax * bx - ay * by - az * bz;
    return this;
  }

  inverse(out = this) {
    let a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
    let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;

    // NOTE: Would be faster to return [0,0,0,0] immediately if dot == 0
    if (dot) {
      let invDot = 1.0 / dot;
      out[0] = -a0 * invDot;
      out[1] = -a1 * invDot;
      out[2] = -a2 * invDot;
      out[3] = a3 * invDot;
    } else {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }

    return out;
  }

  setAxisAngle(axis, rad) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    this[0] = s * axis[0];
    this[1] = s * axis[1];
    this[2] = s * axis[2];
    this[3] = Math.cos(rad);
    return this;
  }

  getAxisAngle(out = new Vec3()) {
    let rad = Math.acos(q[3]) * 2.0;
    let s = Math.sin(rad / 2.0);

    if (s > config.EPSILON) {
      out[0] = q[0] / s;
      out[1] = q[1] / s;
      out[2] = q[2] / s;
    } else {
      // If s is zero, return any axis (no rotation - axis does not matter)
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
    }

    return {
      axis: out,
      angle: rad
    };
  }

  setAxisAngle(axis, angle) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    this[0] = s * axis[0];
    this[1] = s * axis[1];
    this[2] = s * axis[2];
    this[3] = Math.cos(rad);
    return this;
  }

  getAngle(b) {
    let dotproduct = dot(a, b);
    return Math.acos(2 * dotproduct * dotproduct - 1);
  }
}

Quat.prototype.isQuat = true;
Quat.prototype.dot = Vec4.prototype.dot;
Quat.prototype.set = Vec4.prototype.set;
Quat.prototype.copy = Vec4.prototype.copy;
