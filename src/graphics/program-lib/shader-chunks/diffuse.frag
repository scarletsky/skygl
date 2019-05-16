uniform vec4 uColor;

#ifdef COLOR_MAP
uniform sampler2D uColorMap;
#endif

vec4 getMaterialDiffuse() {

  vec4 dDiffuse = uColor;

  #ifdef COLOR_MAP
  dDiffuse *= sRGBToLinear(texture2D(uColorMap, vUv0));
  #endif

  return dDiffuse;
}
