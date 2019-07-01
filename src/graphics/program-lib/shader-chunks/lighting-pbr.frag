vec3 fresnelSchlick(float cosTheta, vec3 F0) {
  return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

vec3 fresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness) {
    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(1.0 - cosTheta, 5.0);
}

float DistributionGGX(vec3 N, vec3 H, float roughness) {
  float a = roughness * roughness;
  float a2 = a * a;
  float NoH  = max(dot(N, H), 0.0);
  float NoH2 = NoH * NoH;

  float nom = a2;
  float denom = (NoH2 * (a2 - 1.0) + 1.0);
  denom = PI * denom * denom;

  return nom / denom;
}

float GeometrySchlickGGX(float NoV, float roughness) {
  float r = (roughness + 1.0);
  float k = (r*r) / 8.0;

  float nom = NoV;
  float denom = NoV * (1.0 - k) + k;

  return nom / denom;
}

float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness) {
  float NoV = max(dot(N, V), 0.0);
  float NoL = max(dot(N, L), 0.0);
  float ggx2  = GeometrySchlickGGX(NoV, roughness);
  float ggx1  = GeometrySchlickGGX(NoL, roughness);

  return ggx1 * ggx2;
}

vec3 calcLighting(
  vec3 N,
  vec3 V,
  vec3 L,
  vec3 radiance,
  vec3 F0,
  vec3 albedo,
  float roughness,
  float metalness
) {
  vec3 H = normalize(V + L);
  // cook-torrance brdf
  float NDF = DistributionGGX(N, H, roughness);
  float G = GeometrySmith(N, V, L, roughness);
  vec3 F = fresnelSchlick(max(dot(H, V), 0.0), F0);
  vec3 kS = F;
  vec3 kD = vec3(1.0) - kS;
  kD *= (1.0 - metalness);
  vec3 nominator = NDF * G * F;
  float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.001;
  vec3 specular = nominator / denominator;
  float NoL = max(dot(N, L), 0.0);

  return (kD * albedo / PI + specular) * radiance * NoL;
}

#if NUM_DIRECTIONAL_LIGHTS > 0
void calcDirectionLighting(
  vec3 N,
  vec3 V,
  vec3 F0,
  vec3 albedo,
  float roughness,
  float metalness,
  out vec3 Lo
) {
  DirectionalLight light;
  vec3 radiance = vec3(1.0);
  vec3 L;

  #pragma unroll_loop
  for (int i = 0; i < NUM_DIRECTIONAL_LIGHTS; i++) {
    light = uDirectionalLights[i];
    L = -light.direction;
    Lo += calcLighting(N, V, L, radiance, F0, albedo, roughness, metalness);
  }
}
#endif
