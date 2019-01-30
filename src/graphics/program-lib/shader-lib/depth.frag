#define DEPTH_MATERIAL

precision highp float;

uniform bool uDepthPack;

#include <packDepthFS>

void main() {
  vec4 color;

  if (uDepthPack) {
    color = packDepth(gl_FragCoord.z);
  } else {
    color = vec4(vec3(gl_FragCoord.z / gl_FragCoord.w / 25.0), 1.0);
  }
  gl_FragColor = color;
}
