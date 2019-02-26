precision highp float;

#include <baseFS>

uniform samplerCube uEnvironmentMap;
varying vec3 vViewDir;

void main() {
  gl_FragColor = textureCube(uEnvironmentMap, vViewDir);
}
