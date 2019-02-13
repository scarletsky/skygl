float dShadow = 1.0;
vec4 dShadowCoord = vec4(1.0);
float texelSize = 1.0 / 1024.0;

void calcShadow(sampler2D shadowMap, vec4 shadowCoord, float bias, float size) {
  float shadow = 1.0;

  shadowCoord.xyz /= shadowCoord.w;
  shadowCoord = shadowCoord * 0.5 + 0.5;

  if (texture2D(shadowMap, shadowCoord.xy).r < shadowCoord.z - bias){
    shadow = 0.5;
  }

  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      float pcfDepth = texture2D(shadowMap, shadowCoord.xy + vec2(x, y) * texelSize).r;
      shadow += (shadowCoord.z - bias < pcfDepth) ? 1.0 : 0.0;
    }
  }
  shadow /= 9.0;

  dShadow = shadow;
}
