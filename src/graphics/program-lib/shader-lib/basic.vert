#include <baseVS>

#ifdef COLOR_MAP
varying vec2 vUv0;
#endif

void main() {

  #ifdef VERTEX_COLOR
  vColor = aColor;
  #endif

  #ifdef COLOR_MAP
  vUv0 = uv0;
  #endif

  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);
}
