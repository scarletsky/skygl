export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const INV_LOG = 1 / Math.log(2);
export const intToBytes = intToBytes32;
export const bytesToInt = bytesToInt32;

export function clamp(value: number, min: number, max: number): number {
    if (value >= max) {
        return max;
    }
    if (value <= min) {
        return min;
    }
    return value;
}

export function intToBytes24(i: number): number[] {
    let r, g, b;

    r = (i >> 16) & 0xff;
    g = (i >> 8) & 0xff;
    b = (i) & 0xff;

    return [r, g, b];
}

export function intToBytes32(i: number): number[] {
    let r, g, b, a;

    r = (i >> 24) & 0xff;
    g = (i >> 16) & 0xff;
    b = (i >> 8) & 0xff;
    a = (i) & 0xff;

    return [r, g, b, a];
}

export function bytesToInt24(r: number | number[], g?: number, b?: number): number {
    if (Array.isArray(r)) {
        b = r[2];
        g = r[1];
        r = r[0];
    }
    return ((r << 16) | (g << 8) | b);

}

export function bytesToInt32(r: number | number[], g?: number, b?: number, a?: number): number {
    if (Array.isArray(r)) {
        a = r[3];
        b = r[2];
        g = r[1];
        r = r[0];
    }
    // Why ((r << 24)>>>32)?
    // << operator uses signed 32 bit numbers, so 128<<24 is negative.
    // >>> used unsigned so >>>32 converts back to an unsigned.
    // See http://stackoverflow.com/questions/1908492/unsigned-integer-in-javascript
    return ((r << 24) | (g << 16) | (b << 8) | a) >>> 32;
}

export function lerp(a: number, b: number, alpha: number): number {
    return a + (b - a) * clamp(alpha, 0, 1);
}

export function lerpAngle(a: number, b: number, alpha: number): number {
    if (b - a > 180) {
        b -= 360;
    }
    if (b - a < -180) {
        b += 360;
    }
    return lerp(a, b, clamp(alpha, 0, 1));
}

export function powerOfTwo(x: number): boolean {
    return ((x !== 0) && !(x & (x - 1)));
}

export function nextPowerOfTwo(value: number): number {
    value--;
    value = (value >> 1) | value;
    value = (value >> 2) | value;
    value = (value >> 4) | value;
    value = (value >> 8) | value;
    value = (value >> 16) | value;
    value++;
    return value;
}

export function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function smoothstep(min: number, max: number, x: number): number {
    if (x <= min) {
        return 0;
    }
    if (x >= max) {
        return 1;
    }

    x = (x - min) / (max - min);

    return x * x * (3 - 2 * x);
}

export function smootherstep(min: number, max: number, x: number): number {
    if (x <= min) {
        return 0;
    }
    if (x >= max) {
        return 1;
    }

    x = (x - min) / (max - min);

    return x * x * x * (x * (x * 6 - 15) + 10);
}

export default {
    DEG_TO_RAD,
    RAD_TO_DEG,
    INV_LOG,
    clamp,
    intToBytes,
    intToBytes24,
    intToBytes32,
    bytesToInt,
    bytesToInt24,
    bytesToInt32,
    lerp,
    lerpAngle,
    powerOfTwo,
    nextPowerOfTwo,
    random,
    smoothstep,
    smootherstep
};
