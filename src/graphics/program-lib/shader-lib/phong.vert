#include <baseVS>

varying vec3 vNormalW;
varying vec3 vPositionW;

#ifdef UV0
varying vec2 vUv0;
#endif

void main() {

  #ifdef DIFFUSE_MAP
  vUv0 = uv0;
  #endif
  vNormalW = normalize(uNormalMatrix * normal);
  vPositionW = vec3(uModelMatrix * vec4(position, 1.0));
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);
}
