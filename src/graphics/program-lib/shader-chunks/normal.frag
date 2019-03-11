vec3 getNormal() {
  vec3 dNormal = texture2D(uNormalMap, vUv0).rgb;
  dNormal = normalize(dNormal * 2.0 - 1.0);
  return dNormal;
}
