import { Vec3 } from './vec3.mjs';
import { Vec4 } from './vec4.mjs';
import { config } from './common.mjs';

export class Quat {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this[3] = w;
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

  get z() {
    return this[2];
  }

  set z(v) {
    this[2] = v;
  }

  get w() {
    return this[3];
  }

  set w(v) {
    this[3] = v;
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

  multiply(b, out = this) {
    let ax = this[0],
      ay = this[1],
      az = this[2],
      aw = this[3];
    let bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }

  inverse(out = this) {
    let a0 = this[0],
      a1 = this[1],
      a2 = this[2],
      a3 = this[3];
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

  conjugate(out = this) {
    out[0] = -this[0];
    out[1] = -this[1];
    out[2] = -this[2];
    out[3] = this[3];
    return out;
  }

  setAxisAngle(axis, rad, out = this) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
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

  setAxisAngle(axis, angle, out = this) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }

  getAngle(b) {
    let dotproduct = dot(a, b);
    return Math.acos(2 * dotproduct * dotproduct - 1);
  }

  rotateX(rad, out = this) {
    rad *= 0.5;

    let ax = this[0],
      ay = this[1],
      az = this[2],
      aw = this[3];
    let bx = Math.sin(rad),
      bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return this;
  }

  rotateY(rad, out = this) {
    rad *= 0.5;

    let ax = this[0],
      ay = this[1],
      az = this[2],
      aw = this[3];
    let by = Math.sin(rad),
      bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }

  rotateZ(rad, out = this) {
    rad *= 0.5;

    let ax = this[0],
      ay = this[1],
      az = this[2],
      aw = this[3];
    let bz = Math.sin(rad),
      bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
  }

  exp(out = this) {
    let x = this[0],
      y = this[1],
      z = this[2],
      w = this[3];

    let r = Math.sqrt(x * x + y * y + z * z);
    let et = Math.exp(w);
    let s = r > 0 ? (et * Math.sin(r)) / r : 0;

    out[0] = x * s;
    out[1] = y * s;
    out[2] = z * s;
    out[3] = et * Math.cos(r);
    return out;
  }

  ln(out = this) {
    let x = this[0],
      y = this[1],
      z = this[2],
      w = this[3];

    let r = Math.sqrt(x * x + y * y + z * z);
    let t = r > 0 ? Math.atan2(r, w) / r : 0;

    out[0] = x * t;
    out[1] = y * t;
    out[2] = z * t;
    out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);

    return out;
  }

  slerp(b, t, out = this) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    let ax = this[0],
      ay = this[1],
      az = this[2],
      aw = this[3];
    let bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];

    let omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    // calculate coefficients
    if (1.0 - cosom > config.EPSILON) {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
  }

  slerp2(a, b, t, out = this) {
    return out.copy(a).slerp(b, t, out);
  }

  equals(b, epsilon = config.EPSILON) {
    return Math.abs(this.dot(b)) >= 1 - epsilon;
  }

  fromEuler(b, order = config.EULER_ORDER) {
    let x = b[0],
        y = b[1],
        z = b[2];
    let halfToRad = Math.PI / 360;
    x *= halfToRad;
    z *= halfToRad;
    y *= halfToRad;

    let sx = Math.sin(x);
    let cx = Math.cos(x);
    let sy = Math.sin(y);
    let cy = Math.cos(y);
    let sz = Math.sin(z);
    let cz = Math.cos(z);

    switch (order) {
      case 'xyz':
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
        break;

      case 'xzy':
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
        break;

      case 'yxz':
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
        break;

      case 'yzx':
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
        break;

      case 'zxy':
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
        break;

      case 'zyx':
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
        break;

      default:
        throw new Error('Unknown angle order ' + order);
    }

    return out;
  }

  fromJSON(d) {
    return this.set(d[0], d[1], d[2], d[3]);
  }

  toJSON() {
    return [this[0], this[1], this[2], this[3]];
  }
}

Quat.prototype.isQuat = true;
Quat.prototype.dot = Vec4.prototype.dot;
Quat.prototype.set = Vec4.prototype.set;
Quat.prototype.copy = Vec4.prototype.copy;
Quat.prototype.normalize = Vec4.prototype.normalize;
Quat.prototype.len = Vec4.prototype.length;
Quat.prototype.length = Vec4.prototype.length;
Quat.prototype.lerp = Vec4.prototype.lerp;
Quat.prototype.lerp2 = Vec4.prototype.lerp2;
Quat.prototype.exactEquals = Vec4.prototype.exactEquals;
