precision highp float;

uniform vec3 uLightPosition;
uniform vec4 uLightColor;

uniform vec3 uViewPosition;
uniform vec4 uAmbient;
uniform vec4 uDiffuse;
uniform sampler2D uDiffuseMap;
uniform vec4 uSpecular;

varying vec3 vNormalW;
varying vec3 vPositionW;

#ifdef VERTEX_COLOR
varying vec4 vColor;
#endif

#ifdef DIFFUSE_MAP
varying vec2 vUv0;
#endif

#include <alphaTestFS>


void main() {
  
  vec3 lightPos = uLightPosition;
  vec4 lightColor = uLightColor;
  vec3 lightDir = normalize(lightPos - vPositionW);
  vec3 viewDir = normalize(uViewPosition - vPositionW);
  vec3 reflectDir = normalize(reflect(-lightDir, vNormalW));
  vec4 color = uDiffuse;

  #ifdef DIFFUSE_MAP
  color *= texture2D(uDiffuseMap, vUv0);
  #endif

  vec4 ambient = uAmbient * lightColor;
  vec4 diffuse = max(dot(viewDir, vNormalW), 0.0) * lightColor;
  vec4 specular = pow(max(dot(viewDir, reflectDir), 0.0), 128.0) * uSpecular * lightColor;
  color = (ambient + diffuse + specular) * color;

  #ifdef ALPHA_TEST
  alphaTest(color.a);
  #endif

  gl_FragColor = color;
}
