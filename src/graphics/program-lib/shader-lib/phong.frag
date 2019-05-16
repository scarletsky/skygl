#define PHONG_MATERIAL

precision highp float;
precision highp int;

uniform vec3 uViewPosition;
uniform vec4 uAmbient;

varying vec3 vNormal;
varying vec3 vPosition;

#ifdef VERTEX_COLOR
varying vec4 vColor;
#endif

#ifdef UV0
varying vec2 vUv0;
#endif

uniform vec4 uColor;
uniform vec4 uSpecular;
uniform vec4 uEmissive;
uniform float uShininess;

#ifdef COLOR_MAP
uniform sampler2D uColorMap;
#endif

#ifdef SPECULAR_MAP
uniform sampler2D uSpecularMap;
#endif

#ifdef EMISSIVE_MAP
uniform sampler2D uEmissiveMap;
#endif

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
  
  vec3 viewDir = normalize(uViewPosition - vPosition);

  vec4 dColor = vec4(0.0);
  vec4 dDiffuse = getDiffuse();
  vec4 dSpecular = getSpecular();
  vec4 dEmissive = getEmissive();
  vec4 dAmbient = vec4(0.2, 0.2, 0.2, 1);
  mat3 dTBN = mat3(1.0);
  vec3 dNormal = vNormal;

  #ifdef USE_TBN
  dTBN = getTBN();
  #endif

  #ifdef NORMAL_MAP
  dNormal = getNormal(dTBN);
  #endif

  #if NUM_DIRECTIONAL_LIGHTS > 0
  calcDirectionalLighting(viewDir, dNormal);
  #endif

  #if NUM_POINT_LIGHTS > 0
  calcPointLighting(viewDir, dNormal);
  #endif

  #if NUM_SPOT_LIGHTS > 0
  calcSpotLighting(viewDir, dNormal);
  #endif

  dColor = (dAmbient * dLightAmbient + dEmissive + dDiffuse * dLightDiffuse + dSpecular * dLightSpecular);

  #ifdef ENVIRONMENT_MAP
  dColor = getEnvReflection(viewDir, dNormal);
  #endif

  #ifdef ALPHA_TEST
  alphaTest(dColor.a);
  #endif

  gl_FragColor = linearTosRGB(dColor);
}
