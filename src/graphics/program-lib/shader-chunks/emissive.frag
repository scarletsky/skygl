uniform vec4 uEmissive;

#ifdef EMISSIVE_MAP
uniform sampler2D uEmissiveMap;
#endif

vec4 getEmissive() {
  vec4 dEmissive = uEmissive;

  #ifdef EMISSIVE_MAP
  dEmissive *= sRGBToLinear(texture2D(uEmissiveMap, vUv0));
  #endif

  return dEmissive;
}
