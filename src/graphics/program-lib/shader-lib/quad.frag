#include <baseFS>

uniform sampler2D uOutputMap;
varying vec2 vUv0;

void main() {
  gl_FragColor = vec4(texture2D(uOutputMap, vUv0).rgb, 1.0);
}
