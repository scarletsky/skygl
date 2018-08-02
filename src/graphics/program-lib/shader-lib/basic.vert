#include <baseVS>

#ifdef DIFFUSE_MAP
varying vec2 vUv0;
#endif

void main() {

  #ifdef VERTEX_COLOR
  vColor = aColor;
  #endif

  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);
}
