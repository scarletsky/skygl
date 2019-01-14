#include <baseVS>

void main() {
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);
}
