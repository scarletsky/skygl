#define PBR_MATERIAL

#include <baseFS>
#include <alphaTestFS>
#include <aoFS>
#include <diffuseFS>
#include <emissiveFS>
#include <metalnessFS>
#include <roughnessFS>
#include <lightCommonFS>
#include <lightingPBRFS>

#ifdef TONE_MAPPING
#include <toneMappingFS>
#endif

uniform vec3 uViewPosition;
uniform vec4 uAmbient;

varying vec3 vNormal;
varying vec3 vPosition;

#ifdef IRRADIANCE_MAP
uniform samplerCube uIrradianceMap;
#endif

#ifdef ENVIRONMENT_MAP
uniform samplerCube uEnvironmentMap;
uniform sampler2D uIntegrateBRDFMap;
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
  vec3 F = fresnelSchlickRoughness(max(dot(N, V), 0.0), F0, roughness);

  #if NUM_DIRECTIONAL_LIGHTS > 0
  calcDirectionLighting(N, V, F0, albedo, roughness, metalness, Lo);
  #endif

  vec3 ambient = vec3(0.03);

  #ifdef IRRADIANCE_MAP
  vec3 kS = F;
  vec3 kD = 1.0 - kS;
  kD *= 1.0 - metalness;
  vec3 irradiance = textureCube(uIrradianceMap, N).rgb;
  ambient = kD * irradiance;
  #endif

  #ifdef ENVIRONMENT_MAP
  vec3 R = reflect(-V, N);
  vec3 prefilteredColor = textureCube(uEnvironmentMap, R, roughness * 5.0).rgb;
  vec2 envBRDF = texture2D(uIntegrateBRDFMap, vec2(max(dot(N, V), 0.0), roughness)).rg;
  vec3 specular = prefilteredColor * (F * envBRDF.x + envBRDF.y);
  ambient += specular;
  #endif

  ambient *= ao;

  vec4 fragColor = vec4(ambient, 1.0);

  #ifdef USE_ALPHA_TEST
  alphaTest(fragColor.a);
  #endif

  #ifdef TONE_MAPPING
  fragColor.rgb = TONE_MAPPING_METHOD(fragColor.rgb);
  #endif

  gl_FragColor = linearTosRGB(fragColor);
}
