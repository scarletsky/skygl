vec4 getDiffuse() {

  vec4 dDiffuse = uColor;

  #ifdef COLOR_MAP
  dDiffuse *= sRGBToLinear(texture2D(uColorMap, vUv0));
  #endif

  return dDiffuse;
}
