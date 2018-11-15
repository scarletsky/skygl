float getLightAttenuation(const in float dist, const in vec4 attenuation) {
  float constant = attenuation.x;
  float linear = attenuation.y * dist;
  float quadratic = attenuation.z * dist * dist;
  return 1.0 / (constant + linear + quadratic);
}

float getLightDiffuseFactor(vec3 lightDir, vec3 normalDir) {
  return max(dot(normalDir, lightDir), 0.0);
}

float getLightSpecularFactor(vec3 viewDir, vec3 reflectDir, float shininess) {
  return pow(max(dot(viewDir, reflectDir), 0.0), shininess);
}

#if NUM_DIRECTIONAL_LIGHTS > 0
void getDirectionalLighting(vec3 viewDir, vec3 normalDir, PhongMaterial material) {
  DirectionalLight light;
  vec3 lightDir;
  vec3 reflectDir;
  float lightDiffuseFactor;
  float lightSpecularFactor;
  for (int i = 0; i < NUM_DIRECTIONAL_LIGHTS; i++) {
    light = uDirectionalLights[i];
    lightDir = light.direction;
    reflectDir = getLightReflectDir(lightDir, normalDir);
    lightDiffuseFactor = getLightDiffuseFactor(-lightDir, normalDir);
    lightSpecularFactor = getLightSpecularFactor(viewDir, reflectDir, material.shininess);
    dLightDiffuse += lightDiffuseFactor * light.color;
    dLightSpecular += lightSpecularFactor * light.color;
  }
}
#endif


#if NUM_POINT_LIGHTS > 0
void getPointLighting(vec3 viewDir, vec3 normalDir, PhongMaterial material) {
  PointLight light;
  vec3 lightDir;
  vec3 reflectDir;
  float lightDiffuseFactor;
  float lightSpecularFactor;
  float dist;
  float attenuation;

  for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
    light = uPointLights[i];
    lightDir = vPositionW - light.position;
    reflectDir = getLightReflectDir(lightDir, normalDir);
    dist = length(lightDir);
    if (dist > light.range) continue;
    attenuation = getLightAttenuation(dist, light.attenuation);
    lightDiffuseFactor = getLightDiffuseFactor(-lightDir, normalDir);
    lightSpecularFactor = getLightSpecularFactor(viewDir, reflectDir, material.shininess);
    dLightDiffuse += lightDiffuseFactor * attenuation * light.color;
    dLightSpecular += lightSpecularFactor * attenuation * light.color;
  }
}
#endif


#if NUM_SPOT_LIGHTS > 0
void getSpotLighting() {

}
#endif
