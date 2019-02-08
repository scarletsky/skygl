float dShadow = 1.0;
vec4 dShadowCoord = vec4(1.0);

void calcShadow(sampler2D shadowMap, vec4 shadowCoord, float bias, float size) {
  float shadow = 1.0;

  shadowCoord.xyz /= shadowCoord.w;
  shadowCoord = shadowCoord * 0.5 + 0.5;

  if (texture2D(shadowMap, shadowCoord.xy).r < shadowCoord.z){
    shadow = 0.5;
  }

  dShadow = shadow;
}
