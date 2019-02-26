#include <baseVS>

varying vec3 vViewDir;

void main() {
  vViewDir = position;
  gl_Position = uProjectionMatrix * uViewMatrix * vec4(position, 1.0);
  gl_Position.z = gl_Position.w - 0.000001;
}
