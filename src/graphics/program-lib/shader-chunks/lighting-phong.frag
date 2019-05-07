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

  #ifdef USE_PHONG
    reflectDir = getLightReflectDir(lightDir, normalDir);
  #endif

  #ifdef USE_BLINN_PHONG
    reflectDir = normalize(-lightDir + viewDir);
  #endif

  lightDiffuseFactor = getLightDiffuseFactor(-lightDir, normalDir);
  lightSpecularFactor = getLightSpecularFactor(viewDir, reflectDir, shininess);
  tLightAmbient = lightColor;
  tLightDiffuse = lightDiffuseFactor * lightColor;
  tLightSpecular = lightSpecularFactor * lightColor;
}

#if NUM_DIRECTIONAL_LIGHTS > 0
void calcDirectionalLighting(vec3 viewDir, vec3 normalDir) {
  DirectionalLight light;
  DirectionalLightShadow shadow;

  #pragma unroll_loop
  for (int i = 0; i < NUM_DIRECTIONAL_LIGHTS; i++) {
    light = uDirectionalLights[i];
    shadow = uDirectionalLightShadows[i];
    calcLighting(viewDir, normalDir, light.direction, light.color, uShininess);
    calcShadow(uDirectionalLightShadowMaps[i], vDirectionalLightShadowCoords[i], shadow.bias, shadow.size);
    dLightDiffuse += tLightDiffuse * light.intensity * dShadow;
    dLightSpecular += tLightSpecular * light.intensity * dShadow;
  }

}
#endif


#if NUM_POINT_LIGHTS > 0
void calcPointLighting(vec3 viewDir, vec3 normalDir) {
  PointLight light;
  vec3 lightDir;
  float dist;
  float attenuation;

  for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
    light = uPointLights[i];
    lightDir = vPosition - light.position;
    dist = length(lightDir);
    // if (dist > light.range) continue;
    lightDir = normalize(lightDir);
    attenuation = getLightAttenuation(dist, light.attenuation);
    calcLighting(viewDir, normalDir, lightDir, light.color, uShininess);
    dLightAmbient += tLightAmbient * attenuation * light.intensity;
    dLightDiffuse += tLightDiffuse * attenuation * light.intensity;
    dLightSpecular += tLightSpecular * attenuation * light.intensity;
  }
}
#endif


#if NUM_SPOT_LIGHTS > 0
void calcSpotLighting(vec3 viewDir, vec3 normalDir) {
  SpotLight light;
  SpotLightShadow shadow;
  vec3 lightDir;
  vec3 reflectDir;
  float lightDiffuseFactor;
  float lightSpecularFactor;
  float theta;
  float attenuation;

  #pragma unroll_loop
  for (int i = 0; i < NUM_SPOT_LIGHTS; i++) {
    light = uSpotLights[i];
    shadow = uSpotLightShadows[i];
    lightDir = normalize(vPosition - light.position);
    theta = dot(lightDir, light.direction);

    if (theta > light.outerConeRadian) {
      attenuation = saturate((theta - light.outerConeRadian) / (light.innerConeRadian - light.outerConeRadian));
      calcLighting(viewDir, normalDir, lightDir, light.color, uShininess);
      calcShadow(uSpotLightShadowMaps[i], vSpotLightShadowCoords[i], shadow.bias, shadow.size);
      dLightDiffuse += tLightDiffuse * attenuation * light.intensity * dShadow;
      dLightSpecular += tLightSpecular * attenuation * light.intensity * dShadow;
    }
  }
}
#endif
