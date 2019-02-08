#ifdef SHADOW_MAP

vec4 shadowCoord;

#if NUM_DIRECTIONAL_LIGHTS > 0
DirectionalLightShadow shadow;
for (int i = 0; i < NUM_DIRECTIONAL_LIGHTS; i++) {
  shadow = uDirectionalLightShadows[i];
  vDirectionalLightShadowCoords[i] = shadow.matrix * uModelMatrix * vec4(position, 1.0);
}
#endif

#endif
