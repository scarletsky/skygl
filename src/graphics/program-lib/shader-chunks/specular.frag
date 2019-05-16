uniform vec4 uSpecular;

#ifdef SPECULAR_MAP
uniform sampler2D uSpecularMap;
#endif

vec4 getMaterialSpecular() {
  vec4 dSpecular = uSpecular;

  #ifdef SPECULAR_MAP
  dSpecular *= texture2D(uSpecularMap, vUv0);
  #endif

  return dSpecular;
}
