uniform sampler2D uNormalMap;
uniform float uNormalMapIntensity;

vec3 unpackNormal(vec4 normal) {
  return normal.xyz * 2.0 - 1.0;
}

vec3 getNormal(mat3 dTBN) {
  vec3 dNormal = unpackNormal(texture2D(uNormalMap, vUv0));
  dNormal = dTBN * dNormal;

  return dNormal;
}
