uniform sampler2D uNormalMap;
uniform float uNormalMapIntensity;

vec3 getNormal(mat3 dTBN) {
  vec3 dNormal = texture2D(uNormalMap, vUv0).rgb;
  dNormal = normalize(dNormal * 2.0 - 1.0);
  dNormal = dTBN * dNormal;

  return dNormal;
}
