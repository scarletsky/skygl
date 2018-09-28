precision highp float;

uniform vec3 uLightPosition;
uniform vec4 uLightColor;

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

#include <alphaTestFS>

void main() {
  
  vec3 lightPos = uLightPosition;
  vec4 lightColor = uLightColor;
  vec3 lightDir = normalize(lightPos - vPositionW);
  vec3 viewDir = normalize(uViewPosition - vPositionW);
  vec3 reflectDir = normalize(reflect(-lightDir, vNormalW));
  float diff = max(dot(viewDir, vNormalW), 0.0);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), uShininess);
  vec4 color = uDiffuse;

  vec4 ambient = uAmbient * lightColor;
  vec4 diffuse = diff * lightColor;
  vec4 specular = spec * uSpecular * lightColor;

  #ifdef DIFFUSE_MAP
  vec4 diffuseMapColor = texture2D(uDiffuseMap, vUv0);
  diffuse *= diffuseMapColor;
  ambient *= diffuseMapColor;
  #endif

  #ifdef SPECULAR_MAP
  vec4 specularMapColor = texture2D(uSpecularMap, vUv0);
  specular *= specularMapColor;
  #endif

  color = (ambient + diffuse + specular);

  #ifdef ALPHA_TEST
  alphaTest(color.a);
  #endif

  gl_FragColor = color;
}
