uniform vec4 uColor;
uniform sampler2D uDiffuseMap;

#ifdef VERTEX_COLOR
varying vec4 vColor;
#endif

#ifdef DIFFUSE_MAP
varying vec2 vUv0;
#endif

#include <alphaTestFS>

void main() {
  
  vec4 color = uColor;

  #ifdef VERTEX_COLOR
  color = vColor;
  #endif

  #ifdef DIFFUSE_MAP
  color *= texture2D(uDiffuseMap, vUv0);
  #endif

  #ifdef ALPHA_TEST
  alphaTest(color.a);
  #endif

  gl_FragColor = color;
}
