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
  vec3 reflectDir;
  float lightDiffuseFactor;
  float lightSpecularFactor;
  for (int i = 0; i < NUM_DIRECTIONAL_LIGHTS; i++) {
    light = uDirectionalLights[i];
    reflectDir = getLightReflectDir(light.direction, normalDir);
    lightDiffuseFactor = getLightDiffuseFactor(-light.direction, normalDir);
    lightSpecularFactor = getLightSpecularFactor(viewDir, reflectDir, material.shininess);
    dLightDiffuse += lightDiffuseFactor * light.color;
    dLightSpecular += lightSpecularFactor * light.color;
  }
}
#endif


#if NUM_POINT_LIGHTS > 0
void getPointLighting() {

}
#endif


#if NUM_SPOT_LIGHTS > 0
void getSpotLighting() {

}
#endif
