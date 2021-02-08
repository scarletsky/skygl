export const EPSILON = 0.000001;
export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const HALF_TO_RAD = Math.PI / 360;

if (!Math.hypot) {
  Math.hypot = function () {
    var y = 0,
      i = arguments.length;
    while (i--) y += arguments[i] * arguments[i];
    return Math.sqrt(y);
  };
}
