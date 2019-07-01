uniform float uAOFactor;

#ifdef USE_AOMAP
uniform sampler2D uAOMap;
#endif

float getMaterialAO() {
  #ifdef USE_AOMAP
    return mix(1.0, texture2D(uAOMap, UV_AOMAP).CHANNEL_AOMAP, uAOFactor);
  #else
    return uAOFactor;
  #endif
}
