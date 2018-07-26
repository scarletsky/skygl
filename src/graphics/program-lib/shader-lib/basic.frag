precision highp float;

uniform vec4 uDiffuse;
uniform sampler2D uDiffuseMap;

#ifdef VERTEX_COLOR
varying vec4 vColor;
#endif

#ifdef DIFFUSE_MAP
varying vec2 vUv0;
#endif

#include <alphaTestFS>

void main() {
  
  vec4 color;

  #ifdef VERTEX_COLOR
  color = vColor;
  #else
  color = uDiffuse;
  #endif

  #ifdef DIFFUSE_MAP
  color *= texture2D(uDiffuseMap, vUv0);
  #endif

  #ifdef ALPHA_TEST
  alphaTest(color.a);
  #endif

  gl_FragColor = color;
}
