#ifdef PHONG_MATERIAL
vec4 getSpecular(const in PhongMaterial material) {
  vec4 dSpecular = material.specular;

  #ifdef SPECULAR_MAP
  dSpecular *= texture2D(material.specularMap, vUv0);
  #endif

  return dSpecular;
}
#endif
