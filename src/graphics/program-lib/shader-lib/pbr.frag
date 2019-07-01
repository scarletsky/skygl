#define PBR_MATERIAL

precision highp float;

uniform vec3 uViewPosition;
uniform vec4 uAmbient;

varying vec3 vNormal;
varying vec3 vPosition;

#include <baseFS>
#include <alphaTestFS>
#include <aoFS>
#include <diffuseFS>
#include <emissiveFS>
#include <metalnessFS>
#include <roughnessFS>
#include <lightCommonFS>
#include <lightingPBRFS>

#ifdef IRRADIANCE_MAP
uniform samplerCube uIrradianceMap;
#endif

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(uViewPosition - vPosition);
  vec3 Lo = vec3(0.0);
  vec3 albedo = getMaterialDiffuse();
  float metalness = getMaterialMetalness();
  float roughness = getMaterialRoughness();
  float ao = getMaterialAO();
  vec3 F0 = mix(vec3(0.04), albedo, metalness);

  #if NUM_DIRECTIONAL_LIGHTS > 0
  calcDirectionLighting(N, V, F0, albedo, roughness, metalness, Lo);
  #endif

  vec3 ambient = vec3(0.03) * albedo * ao;

  #ifdef IRRADIANCE_MAP
  vec3 kS = fresnelSchlickRoughness(max(dot(N, V), 0.0), F0, roughness);
  vec3 kD = 1.0 - kS;
  vec3 irradiance = textureCube(uIrradianceMap, N).rgb;
  ambient *= (kD * irradiance * albedo) * ao;
  #endif

  vec4 fragColor = vec4(ambient + Lo, 1.0);

  #ifdef USE_ALPHA_TEST
  alphaTest(fragColor.a);
  #endif

  gl_FragColor = linearTosRGB(fragColor);
}
