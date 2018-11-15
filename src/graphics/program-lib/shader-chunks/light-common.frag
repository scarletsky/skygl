vec4 dLightDiffuse = vec4(0.0);
vec4 dLightSpecular = vec4(0.0);

#if NUM_DIRECTIONAL_LIGHTS > 0
struct DirectionalLight {
  vec3 direction;
  vec4 color;
};
uniform DirectionalLight uDirectionalLights[NUM_DIRECTIONAL_LIGHTS];
#endif


#if NUM_POINT_LIGHTS > 0
struct PointLight {
  vec3 position;
  vec4 color;
  float range;
  vec4 attenuation;
};
uniform PointLight uPointLights[NUM_POINT_LIGHTS];
#endif


#if NUM_SPOT_LIGHTS > 0
struct SpotLight {
  vec3 position;
  vec3 direction;
  vec4 color;
  float innerConeRadian;
  float outerConeRadian;
};
uniform SpotLight uSpotLights[NUM_SPOT_LIGHTS];
#endif


vec3 getLightReflectDir(vec3 lightDir, vec3 normalDir) {
  return normalize(reflect(lightDir, normalDir));
}
