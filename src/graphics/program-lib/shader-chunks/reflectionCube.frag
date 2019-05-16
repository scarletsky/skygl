vec4 getEnvReflection(vec3 V, vec3 N) {
  vec3 reflectDir = normalize(reflect(-V, N));
  return textureCube(uEnvironmentMap, reflectDir);
}
