uniform vec4 uDiffuse;

#ifdef DIFFUSE_MAP
uniform sampler2D uDiffuseMap;
#endif

vec4 getDiffuse() {
  vec4 diffuse = uDiffuse;

  return diffuse;
}
