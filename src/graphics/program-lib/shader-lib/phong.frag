#define PHONG_MATERIAL

precision highp float;

uniform vec3 uViewPosition;
uniform vec4 uAmbient;
uniform vec4 uDiffuse;
uniform vec4 uSpecular;
uniform float uShininess;

uniform sampler2D uDiffuseMap;
uniform sampler2D uSpecularMap;

varying vec3 vNormalW;
varying vec3 vPositionW;

#ifdef VERTEX_COLOR
varying vec4 vColor;
#endif

#ifdef UV0
varying vec2 vUv0;
#endif

struct PhongMaterial {
  vec4 diffuse;
  sampler2D diffuseMap;

  vec4 specular;
  sampler2D specularMap;

  float shininess;
};

uniform PhongMaterial uMaterial;

#include <baseFS>
#include <alphaTestFS>
#include <diffuseFS>
#include <specularFS>
#include <lightCommonFS>
#include <lightingPhongFS>

void main() {
  
  vec3 viewDir = normalize(uViewPosition - vPositionW);

  vec4 dColor = vec4(0.0);
  vec4 dDiffuse = getDiffuse(uMaterial);
  vec4 dSpecular = getSpecular(uMaterial);

  vec4 dAmbient = vec4(0.2, 0.2, 0.2, 1);

  #if NUM_DIRECTIONAL_LIGHTS > 0
  calcDirectionalLighting(viewDir, vNormalW, uMaterial);
  #endif

  #if NUM_POINT_LIGHTS > 0
  calcPointLighting(viewDir, vNormalW, uMaterial);
  #endif

  #if NUM_SPOT_LIGHTS > 0
  calcSpotLighting(viewDir, vNormalW, uMaterial);
  #endif

  dColor = (dAmbient + dDiffuse * dLightDiffuse + dSpecular * dLightSpecular);

  #ifdef ALPHA_TEST
  alphaTest(dColor.a);
  #endif

  gl_FragColor = dColor;
}
