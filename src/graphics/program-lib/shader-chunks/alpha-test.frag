uniform float uAlphaTest;

void alphaTest(float alpha) {
  if (alpha < uAlphaTest) discard;
}
