attribute vec3 position;

uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec3 vPosition;

void main() {
  vPosition = position;

  gl_Position = uProjectionMatrix * uViewMatrix * vec4(position, 1.0);
  gl_Position.z = gl_Position.w;
}
