#ifdef PHONG_MATERIAL
vec4 getDiffuse(const in PhongMaterial material) {

  vec4 dDiffuse = material.diffuse;

  #ifdef DIFFUSE_MAP
  dDiffuse *= texture2D(material.diffuseMap, vUv0);
  #endif

  return dDiffuse;
}
#endif
