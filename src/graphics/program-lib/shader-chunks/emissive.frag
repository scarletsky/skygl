vec4 getEmissive() {
  vec4 dEmissive = uEmissive;

  #ifdef EMISSIVE_MAP
  dEmissive *= texture2D(uEmissiveMap, vUv0);
  #endif

  return dEmissive;
}
