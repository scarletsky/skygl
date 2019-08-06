uniform float uExposure;

vec3 LinearToneMap(vec3 color) {
    return color * uExposure;
}

vec3 ReinhardToneMap(vec3 color) {
    color *= uExposure;
    return color / (vec3(1.0) + color);
}

vec3 CEToneMap(vec3 color) {
    return 1.0 - exp(-uExposure * color);
}

vec3 uncharted2ToneMap(vec3 x) {
    const float A = 0.22;
    const float B = 0.30;
    const float C = 0.10;
    const float D = 0.20;
    const float E = 0.01;
    const float F = 0.30;
    return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;
}

vec3 FilmicToneMap(vec3 color) {
    const float WHITE = 11.2;
    return uncharted2ToneMap(1.6 * uExposure * color) / uncharted2ToneMap(vec3(WHITE));
}

vec3 ACESToneMap(vec3 color) {
    const float A = 2.51;
    const float B = 0.03;
    const float C = 2.43;
    const float D = 0.59;
    const float E = 0.14;
    color *= uExposure;
    return (color * (A * color + B)) / (color * (C * color + D) + E);
}
