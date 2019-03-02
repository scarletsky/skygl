#define PHONG_MATERIAL

precision highp float;
precision highp int;

uniform vec3 uViewPosition;
uniform vec4 uAmbient;

varying vec3 vNormalW;
varying vec3 vPositionW;

#ifdef VERTEX_COLOR
varying vec4 vColor;
#endif

#ifdef UV0
varying vec2 vUv0;
#endif

uniform vec4 uDiffuse;
uniform sampler2D uDiffuseMap;
uniform vec4 uSpecular;
uniform sampler2D uSpecularMap;
uniform float uShininess;
uniform samplerCube uEnvironmentMap;
uniform float uRefractiveIndex;

#include <baseFS>
#include <alphaTestFS>
#include <diffuseFS>
#include <specularFS>
#include <lightCommonFS>
#include <shadowCommonVSFS>
#include <shadowCommonFS>
#include <lightingPhongFS>
#include <reflectionCubeFS>
#include <refractionFS>

void main() {
  
  vec3 viewDir = normalize(uViewPosition - vPositionW);

  vec4 dColor = vec4(0.0);
  vec4 dDiffuse = getDiffuse();
  vec4 dSpecular = getSpecular();
  vec4 dAmbient = vec4(0.2, 0.2, 0.2, 1);

  #if NUM_DIRECTIONAL_LIGHTS > 0
  calcDirectionalLighting(viewDir, vNormalW);
  #endif

  #if NUM_POINT_LIGHTS > 0
  calcPointLighting(viewDir, vNormalW);
  #endif

  #if NUM_SPOT_LIGHTS > 0
  calcSpotLighting(viewDir, vNormalW);
  #endif

  dColor = (dAmbient * dLightAmbient + dDiffuse * dLightDiffuse + dSpecular * dLightSpecular);

  #ifdef ENVIRONMENT_MAP
  dColor = getEnvReflection(viewDir, vNormalW);
  #endif

  #ifdef ALPHA_TEST
  alphaTest(dColor.a);
  #endif

  gl_FragColor = dColor;
}
