#if NUM_DIRECTIONAL_LIGHTS > 0
struct DirectionalLight {
  vec3 direction;
  vec4 color;
  float intensity;
  bool castShadow;
};
uniform DirectionalLight uDirectionalLights[NUM_DIRECTIONAL_LIGHTS];
#endif


#if NUM_POINT_LIGHTS > 0
struct PointLight {
  vec3 position;
  vec4 color;
  vec4 attenuation;
  float range;
  float intensity;
};
uniform PointLight uPointLights[NUM_POINT_LIGHTS];
#endif


#if NUM_SPOT_LIGHTS > 0
struct SpotLight {
  vec3 position;
  vec3 direction;
  vec4 color;
  float intensity;
  float innerConeRadian;
  float outerConeRadian;
};
uniform SpotLight uSpotLights[NUM_SPOT_LIGHTS];
#endif

vec3 getLightReflectDir(vec3 L, vec3 N) {
  return normalize(reflect(-L, N));
}
