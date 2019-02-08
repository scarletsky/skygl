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
