#define PI 3.1415926
#define saturate(x) clamp(x, 0.0, 1.0);

// // from sketchfab
// #define LIN_SRGB(x) x < 0.0031308 ? x * 12.92 : 1.055 * pow(x, 1.0/2.4) - 0.055
// #define SRGB_LIN(x) x < 0.04045 ? x * (1.0 / 12.92) : pow((x + 0.055) * (1.0 / 1.055), 2.4)
#define LIN_SRGB(x) pow(x, 0.45)
#define SRGB_LIN(x) pow(x, 2.2)

float square(float x) {
    return x * x;
}

float linearTosRGB(float color) {
    return LIN_SRGB(color);
}

vec3 linearTosRGB(vec3 color) {
    return vec3(LIN_SRGB(color.r), LIN_SRGB(color.g), LIN_SRGB(color.b));
}

vec4 linearTosRGB(vec4 color) {
    return vec4(LIN_SRGB(color.r), LIN_SRGB(color.g), LIN_SRGB(color.b), color.a);
}

float sRGBToLinear(float color) {
    return SRGB_LIN(color);
}

vec3 sRGBToLinear(vec3 color) {
    return vec3(SRGB_LIN(color.r), SRGB_LIN(color.g), SRGB_LIN(color.b));
}

vec4 sRGBToLinear(vec4 color) {
    return vec4(SRGB_LIN(color.r), SRGB_LIN(color.g), SRGB_LIN(color.b), color.a);
}
