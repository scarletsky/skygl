#include <baseVS>

void main() {

  #ifdef VERTEX_COLOR
  vColor = aColor;
  #endif

  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.0);
}
