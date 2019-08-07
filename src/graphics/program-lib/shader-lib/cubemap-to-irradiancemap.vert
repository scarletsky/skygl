#include <baseVS>

varying vec3 vPosition;

void main() {
  vPosition = position;

  gl_Position = uProjectionMatrix * uViewMatrix * vec4(position, 1.0);
  gl_Position.z = gl_Position.w;
}
