precision highp float;

void main() {
  // gl_FragDepth = gl_FragCoord.z;
  float z = gl_FragCoord.z;
  gl_FragColor = vec4(z, z, z, 1.0);
}
