vec4 dLightAmbient = vec4(0.0);
vec4 dLightDiffuse = vec4(0.0);
vec4 dLightSpecular = vec4(0.0);
vec4 tLightAmbient = vec4(0.0);
vec4 tLightDiffuse = vec4(0.0);
vec4 tLightSpecular = vec4(0.0);

float getLightAttenuation(const in float dist, const in vec4 attenuation) {
  float constant = attenuation.x;
  float linear = attenuation.y * dist;
  float quadratic = attenuation.z * dist * dist;
  return 1.0 / (constant + linear + quadratic);
}

float getLightDiffuseFactor(vec3 N, vec3 L) {
  return max(dot(N, L), 0.0);
}

float getLightSpecularFactor(vec3 VorN, vec3 R, float shininess) {
  return pow(max(dot(VorN, R), 0.0), shininess);
}

void calcLighting(vec3 V, vec3 N, vec3 L, vec4 lightColor, float shininess) {
  float lightDiffuseFactor;
  float lightSpecularFactor;
  vec3 R;
  vec3 VorN;

  #ifdef USE_PHONG
    VorN = V;
    R = getLightReflectDir(L, N);
  #endif

  #ifdef USE_BLINN_PHONG
    VorN = N;
    R = normalize(L + V);
  #endif

  lightDiffuseFactor = getLightDiffuseFactor(N, L);
  lightSpecularFactor = getLightSpecularFactor(VorN, R, shininess);
  tLightAmbient = lightColor;
  tLightDiffuse = lightDiffuseFactor * lightColor;
  tLightSpecular = lightSpecularFactor * lightColor;
}

#if NUM_DIRECTIONAL_LIGHTS > 0
void calcDirectionalLighting(vec3 V, vec3 N) {
  DirectionalLight light;
  DirectionalLightShadow shadow;

  #pragma unroll_loop
  for (int i = 0; i < NUM_DIRECTIONAL_LIGHTS; i++) {
    light = uDirectionalLights[i];
    shadow = uDirectionalLightShadows[i];
    calcLighting(V, N, -light.direction, light.color, uShininess);
    calcShadow(uDirectionalLightShadowMaps[i], vDirectionalLightShadowCoords[i], shadow.bias, shadow.size);
    dLightDiffuse += tLightDiffuse * light.intensity * dShadow;
    dLightSpecular += tLightSpecular * light.intensity * dShadow;
  }

}
#endif


#if NUM_POINT_LIGHTS > 0
void calcPointLighting(vec3 V, vec3 N) {
  PointLight light;
  vec3 L;
  float dist;
  float attenuation;

  for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
    light = uPointLights[i];
    L = light.position - vPosition;
    dist = length(L);
    // if (dist > light.range) continue;
    L = normalize(L);
    attenuation = getLightAttenuation(dist, light.attenuation);
    calcLighting(V, N, L, light.color, uShininess);
    dLightAmbient += tLightAmbient * attenuation * light.intensity;
    dLightDiffuse += tLightDiffuse * attenuation * light.intensity;
    dLightSpecular += tLightSpecular * attenuation * light.intensity;
  }
}
#endif


#if NUM_SPOT_LIGHTS > 0
void calcSpotLighting(vec3 V, vec3 N) {
  SpotLight light;
  SpotLightShadow shadow;
  vec3 L;
  vec3 R;
  float lightDiffuseFactor;
  float lightSpecularFactor;
  float theta;
  float attenuation;

  #pragma unroll_loop
  for (int i = 0; i < NUM_SPOT_LIGHTS; i++) {
    light = uSpotLights[i];
    shadow = uSpotLightShadows[i];
    L = normalize(light.position - vPosition);
    theta = dot(L, light.direction);

    if (theta > light.outerConeRadian) {
      attenuation = saturate((theta - light.outerConeRadian) / (light.innerConeRadian - light.outerConeRadian));
      calcLighting(V, N, L, light.color, uShininess);
      calcShadow(uSpotLightShadowMaps[i], vSpotLightShadowCoords[i], shadow.bias, shadow.size);
      dLightDiffuse += tLightDiffuse * attenuation * light.intensity * dShadow;
      dLightSpecular += tLightSpecular * attenuation * light.intensity * dShadow;
    }
  }
}
#endif
