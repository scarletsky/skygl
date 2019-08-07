#include <baseFS>

#ifdef TONE_MAPPING
#include <toneMappingFS>
#endif

uniform samplerCube uEnvironmentMap;
varying vec3 vViewDir;

void main() {
  vec4 fragColor = textureCube(uEnvironmentMap, vViewDir);

  #ifdef TONE_MAPPING
  fragColor.rgb = TONE_MAPPING_METHOD(fragColor.rgb);
  #endif

  gl_FragColor = fragColor;
}
