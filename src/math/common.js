export const EPSILON = 1e-6;
export const RAD_TO_DEG = 180 / Math.PI;
export const DEG_TO_RAD = Math.PI / 180;
export const config = {
  EPSILON,
  DEBUG: false,
};

export function toRadians(deg) {
  return deg * DEG_TO_RAD;
}

export function toDegrees(rad) {
  return rad * RAD_TO_DEG;
}

// NOTE: Symmetric round
export function round(value) {
  if (value >= 0) return Math.round(value)
  return -Math.round(-value);
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function configure(options = {}) {
  Object.assign(config, options);
  return config;
}
