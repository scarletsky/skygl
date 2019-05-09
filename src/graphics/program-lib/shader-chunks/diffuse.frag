vec4 getDiffuse() {

  vec4 dDiffuse = uDiffuse;

  #ifdef DIFFUSE_MAP
  dDiffuse *= sRGBToLinear(texture2D(uDiffuseMap, vUv0));
  #endif

  return dDiffuse;
}
