attribute vec3 POSITION;
attribute vec3 NORMAL;
attribute vec2 TEXCOORD_0;

uniform mat4 sky_ModelMatrix;
uniform mat4 sky_ViewMatrix;
uniform mat4 sky_ProjectionMatrix;

void main() {
    gl_Position = sky_ProjectionMatrix * sky_ViewMatrix * sky_ModelMatrix * POSITION;
}
