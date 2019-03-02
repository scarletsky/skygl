vec4 getEnvReflection(vec3 viewDir, vec3 normalDir) {
  vec3 reflectDir = normalize(reflect(-viewDir, normalDir));
  return textureCube(uEnvironmentMap, reflectDir);
}
