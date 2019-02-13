#ifdef SHADOW_MAP

#if NUM_DIRECTIONAL_LIGHTS > 0
DirectionalLightShadow dirShadow;
for (int i = 0; i < NUM_DIRECTIONAL_LIGHTS; i++) {
  dirShadow = uDirectionalLightShadows[i];
  vDirectionalLightShadowCoords[i] = dirShadow.matrix * uModelMatrix * vec4(position, 1.0);
}
#endif

#if NUM_SPOT_LIGHTS > 0
SpotLightShadow spotShadow;
for (int i = 0; i < NUM_SPOT_LIGHTS; i++) {
  spotShadow = uSpotLightShadows[i];
  vSpotLightShadowCoords[i] = spotShadow.matrix * uModelMatrix * vec4(position, 1.0);
}
#endif

#endif
