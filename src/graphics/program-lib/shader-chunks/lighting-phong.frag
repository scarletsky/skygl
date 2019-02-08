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

void calcLighting(vec3 viewDir, vec3 normalDir, vec3 lightDir, vec4 lightColor, float shininess) {
  float lightDiffuseFactor;
  float lightSpecularFactor;
  vec3 reflectDir;

  reflectDir = getLightReflectDir(lightDir, normalDir);
  lightDiffuseFactor = getLightDiffuseFactor(-lightDir, normalDir);
  lightSpecularFactor = getLightSpecularFactor(viewDir, reflectDir, shininess);
  tLightAmbient = lightColor;
  tLightDiffuse = lightDiffuseFactor * lightColor;
  tLightSpecular = lightSpecularFactor * lightColor;
}

#if NUM_DIRECTIONAL_LIGHTS > 0
void calcDirectionalLighting(vec3 viewDir, vec3 normalDir, PhongMaterial material) {
  DirectionalLight light;
  DirectionalLightShadow shadow;

  #pragma unroll_loop
  for (int i = 0; i < NUM_DIRECTIONAL_LIGHTS; i++) {
    light = uDirectionalLights[i];
    shadow = uDirectionalLightShadows[i];
    calcLighting(viewDir, normalDir, light.direction, light.color, material.shininess);
    calcShadow(uDirectionalLightShadowMaps[i], vDirectionalLightShadowCoords[i], shadow.bias, shadow.size);
    dLightDiffuse += tLightDiffuse * light.intensity * dShadow;
    dLightSpecular += tLightSpecular * light.intensity * dShadow;
  }

}
#endif


#if NUM_POINT_LIGHTS > 0
void calcPointLighting(vec3 viewDir, vec3 normalDir, PhongMaterial material) {
  PointLight light;
  vec3 lightDir;
  float dist;
  float attenuation;

  for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
    light = uPointLights[i];
    lightDir = vPositionW - light.position;
    dist = length(lightDir);
    // if (dist > light.range) continue;
    lightDir = normalize(lightDir);
    attenuation = getLightAttenuation(dist, light.attenuation);
    calcLighting(viewDir, normalDir, lightDir, light.color, material.shininess);
    dLightAmbient += tLightAmbient * attenuation * light.intensity;
    dLightDiffuse += tLightDiffuse * attenuation * light.intensity;
    dLightSpecular += tLightSpecular * attenuation * light.intensity;
  }
}
#endif


#if NUM_SPOT_LIGHTS > 0
void calcSpotLighting(vec3 viewDir, vec3 normalDir, PhongMaterial material) {
  SpotLight light;
  vec3 lightDir;
  vec3 reflectDir;
  float lightDiffuseFactor;
  float lightSpecularFactor;
  float theta;
  float attenuation;

  for (int i = 0; i < NUM_SPOT_LIGHTS; i++) {
    light = uSpotLights[i];
    lightDir = normalize(vPositionW - light.position);
    theta = dot(lightDir, light.direction);

    if (theta > light.outerConeRadian) {
      attenuation = saturate((theta - light.outerConeRadian) / (light.innerConeRadian - light.outerConeRadian));
      calcLighting(viewDir, normalDir, lightDir, light.color, material.shininess);
      dLightDiffuse += tLightDiffuse * attenuation * light.intensity;
      dLightSpecular += tLightSpecular * attenuation * light.intensity;
    }
  }
}
#endif
