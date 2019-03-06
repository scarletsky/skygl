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
uniform vec4 uSpecular;
uniform vec4 uEmissive;
uniform float uShininess;

#ifdef DIFFUSE_MAP
uniform sampler2D uDiffuseMap;
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

#ifdef ENVIRONMENT_MAP
uniform samplerCube uEnvironmentMap;
uniform float uRefractiveIndex;
#include <reflectionCubeFS>
#include <refractionFS>
#endif

void main() {
  
  vec3 viewDir = normalize(uViewPosition - vPositionW);

  vec4 dColor = vec4(0.0);
  vec4 dDiffuse = getDiffuse();
  vec4 dSpecular = getSpecular();
  vec4 dEmissive = getEmissive();
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

  dColor = (dAmbient * dLightAmbient + dEmissive + dDiffuse * dLightDiffuse + dSpecular * dLightSpecular);

  #ifdef ENVIRONMENT_MAP
  dColor = getEnvReflection(viewDir, vNormalW);
  #endif

  #ifdef ALPHA_TEST
  alphaTest(dColor.a);
  #endif

  gl_FragColor = dColor;
}
