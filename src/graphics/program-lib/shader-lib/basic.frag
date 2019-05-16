#define BASIC_MATERIAL

precision highp float;

#ifdef USE_VERTEX_COLOR
varying vec4 vColor;
#endif

#ifdef COLOR_MAP
varying vec2 vUv0;
#endif

#include <diffuseFS>
#include <alphaTestFS>

void main() {
  
  vec4 dColor;

  #ifdef USE_VERTEX_COLOR
  dColor = vColor;
  #else
  dColor = geDiffuse();
  #endif

  #ifdef USE_ALPHA_TEST
  alphaTest(dColor.a);
  #endif

  gl_FragColor = dColor;
}
