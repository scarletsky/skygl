uniform float uRoughnessFactor;

#ifdef USE_ROUGHNESSMAP
uniform sampler2D uRoughnessMap;
#endif

float getMaterialRoughness() {
  #ifdef USE_ROUGHNESSMAP
    return uRoughnessFactor * texture2D(uRoughnessMap, UV_ROUGHNESSMAP).CHANNEL_ROUGHNESSMAP;
  #else
    return uRoughnessFactor;
  #endif
}
