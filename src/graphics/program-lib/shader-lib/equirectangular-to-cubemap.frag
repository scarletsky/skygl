precision highp float;

uniform int uFace;
uniform sampler2D uEquirectangularMap;

varying vec3 vPosition;
varying vec2 vUv0;

const vec2 invAtan = vec2(0.1591, 0.3183);

vec2 sampleSphericalMap(vec3 v) {
    vec2 uv = vec2(atan(v.z, v.x), asin(v.y));
    uv *= invAtan;
    uv += 0.5;
    return uv;
}

void main() {
    vec2 uv = sampleSphericalMap(normalize(vPosition));
    vec3 color = texture2D(uEquirectangularMap, uv).rgb;

    gl_FragColor = vec4(color, 1.0);
}
