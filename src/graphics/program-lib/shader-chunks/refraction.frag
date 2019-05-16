uniform float uRefractiveIndex;
vec4 getRefraction(vec3 V, vec3 N) {
  vec3 refractDir = normalize(refract(-V, N, uRefractiveIndex));
  return textureCube(uEnvironmentMap, refractDir);
}
