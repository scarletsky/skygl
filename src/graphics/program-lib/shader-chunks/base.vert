attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec3 aTangent;
attribute vec2 aUv0;
attribute vec2 aUv1;

#ifdef VERTEX_COLOR
attribute vec3 aColor;
varying vec3 vColor;
#endif

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uViewProjectionMatrix;
uniform mat3 uNormalMatrix;
