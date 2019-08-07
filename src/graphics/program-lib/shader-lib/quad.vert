#include <baseVS>

varying vec2 vUv0;

void main() {
  vUv0 = uv0;
  gl_Position = vec4(position, 1.0);
}
