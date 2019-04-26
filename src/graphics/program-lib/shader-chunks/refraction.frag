uniform float uRefractiveIndex;
vec4 getRefraction(vec3 viewDir, vec3 normalDir) {
  vec3 refractDir = normalize(refract(-viewDir, normalDir, uRefractiveIndex));
  return textureCube(uEnvironmentMap, refractDir);
}
