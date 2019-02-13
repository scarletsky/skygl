#if NUM_DIRECTIONAL_LIGHTS > 0
struct DirectionalLightShadow {
  int type;
  float bias;
  float size;
  mat4 matrix;
};
uniform DirectionalLightShadow uDirectionalLightShadows[NUM_DIRECTIONAL_LIGHTS];
uniform sampler2D uDirectionalLightShadowMaps[NUM_DIRECTIONAL_LIGHTS];
varying vec4 vDirectionalLightShadowCoords[NUM_DIRECTIONAL_LIGHTS];
#endif


#if NUM_SPOT_LIGHTS > 0
struct SpotLightShadow {
  int type;
  float bias;
  float size;
  mat4 matrix;
};
uniform SpotLightShadow uSpotLightShadows[NUM_SPOT_LIGHTS];
uniform sampler2D uSpotLightShadowMaps[NUM_SPOT_LIGHTS];
varying vec4 vSpotLightShadowCoords[NUM_SPOT_LIGHTS];
#endif
