#include <baseVS>

varying vec3 vPosition;
varying vec3 vNormal;

#ifdef USE_UV0
varying vec2 vUv0;
#endif

void main() {
  #ifdef COLOR_MAP
  vUv0 = uv0;
  #endif

  vNormal = normalize(uNormalMatrix * normal);

  #ifdef USE_TBN
  vTangent = normalize(uNormalMatrix * tangent.xyz);
  vBitangent = cross(vNormal, vTangent) * tangent.w;
  #endif

  vPosition = vec3(uModelMatrix * vec4(position, 1.0));
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);
}
