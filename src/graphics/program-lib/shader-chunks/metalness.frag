uniform float uMetalnessFactor;

#ifdef USE_METALNESSMAP
uniform sampler2D uMetalnessMap;
#endif

float getMaterialMetalness() {
  #ifdef USE_METALNESSMAP
    return uMetalnessFactor * texture2D(uMetalnessMap, UV_METALNESSMAP).CHANNEL_METALNESSMAP;
  #else
    return uMetalnessFactor;
  #endif
}
