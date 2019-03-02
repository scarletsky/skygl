vec4 getSpecular() {
  vec4 dSpecular = uSpecular;

  #ifdef SPECULAR_MAP
  dSpecular *= texture2D(uSpecularMap, vUv0);
  #endif

  return dSpecular;
}
