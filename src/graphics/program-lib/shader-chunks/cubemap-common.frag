vec3 getSampleDir(int face, vec2 uv) {
  vec3 sampleDir;
  vec2 st = uv * 2.0 - 1.0;

  if (face == 0) {
    sampleDir = vec3(1.0, -st.y, -st.x);
  } else if (face == 1) {
    sampleDir = vec3(-1.0, st.y, -st.x);
  } else if (face == 2) {
    sampleDir = vec3(st.x, 1.0, st.y);
  } else if (face == 3) {
    sampleDir = vec3(st.x, -1.0, -st.y);
  } else if (face == 4) {
    sampleDir = vec3(st.x, -st.y, 1.0);
  } else {
    sampleDir = vec3(-st.x, -st.y, -1.0);
  }

  return sampleDir;
}
