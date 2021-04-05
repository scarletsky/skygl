vec3 packNormal(const in vec3 normal) {
    return normalize(normal) * 0.5 + 0.5;
}

vec3 unpackNormal(const in vec3 rgb) {
    return rgb * 2.0 - 1.0;
}
