#include <baseVS>

void main() {

  #ifdef VERTEX_COLOR
  vColor = aColor;
  #endif

  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);
}
