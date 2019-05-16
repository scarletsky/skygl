#define PHONG_MATERIAL

precision highp float;
precision highp int;

uniform vec3 uViewPosition;
uniform vec4 uAmbient;

varying vec3 vNormal;
varying vec3 vPosition;

#ifdef USE_VERTEX_COLOR
varying vec4 vColor;
#endif

#ifdef USE_UV0
varying vec2 vUv0;
#endif

uniform float uShininess;

#include <baseFS>
#include <alphaTestFS>
#include <diffuseFS>
#include <specularFS>
#include <emissiveFS>
#include <lightCommonFS>
#include <shadowCommonVSFS>
#include <shadowCommonFS>
#include <lightingPhongFS>

#ifdef USE_TBN
varying vec3 vTangent;
varying vec3 vBitangent;
#include <tbnFS>
#endif

#ifdef NORMAL_MAP
#include <normalFS>
#endif

#ifdef ENVIRONMENT_MAP
uniform samplerCube uEnvironmentMap;
#include <reflectionCubeFS>
#include <refractionFS>
#endif

void main() {

  vec3 N = vNormal;
  vec3 V = normalize(uViewPosition - vPosition);
  vec4 dDiffuse = getMaterialDiffuse();
  vec4 dSpecular = getMaterialSpecular();
  vec4 dEmissive = getMaterialEmissive();
  vec4 dAmbient = vec4(0.2, 0.2, 0.2, 1);
  mat3 dTBN = mat3(1.0);

  #ifdef USE_TBN
  dTBN = getTBN();
  #endif

  #ifdef NORMAL_MAP
  N = getNormal(dTBN);
  #endif

  #if NUM_DIRECTIONAL_LIGHTS > 0
  calcDirectionalLighting(V, N);
  #endif

  #if NUM_POINT_LIGHTS > 0
  calcPointLighting(V, N);
  #endif

  #if NUM_SPOT_LIGHTS > 0
  calcSpotLighting(V, N);
  #endif

  vec4 dColor = (dAmbient * dLightAmbient + dEmissive + dDiffuse * dLightDiffuse + dSpecular * dLightSpecular);

  #ifdef ENVIRONMENT_MAP
  dColor = getEnvReflection(V, N);
  #endif

  #ifdef USE_ALPHA_TEST
  alphaTest(dColor.a);
  #endif

  gl_FragColor = linearTosRGB(dColor);
}
