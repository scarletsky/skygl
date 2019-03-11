#include <baseVS>

varying vec3 vNormal;
varying vec3 vPosition;

#ifdef UV0
varying vec2 vUv0;
#endif

#ifdef SHADOW_MAP
varying vec4 vShadowCoord;
#include <shadowCommonVSFS>
#endif

void main() {

  #ifdef DIFFUSE_MAP
  vUv0 = uv0;
  #endif

  vNormal = normalize(uNormalMatrix * normal);
  vPosition = vec3(uModelMatrix * vec4(position, 1.0));
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);

  #include <shadowCommonVS>
}
