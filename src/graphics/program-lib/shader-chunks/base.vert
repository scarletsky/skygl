attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv0;
attribute vec2 uv1;

#ifdef USE_TBN
attribute vec4 tangent;
varying vec3 vTangent;
varying vec3 vBitangent;
#endif

#ifdef USE_VERTEX_COLOR
attribute vec3 aColor;
varying vec3 vColor;
#endif

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uViewProjectionMatrix;
uniform mat3 uNormalMatrix;
