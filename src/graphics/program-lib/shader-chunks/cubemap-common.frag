vec3 getCubemapSampleDir(int face, vec2 uv) {
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

#ifdef GL2
float RadicalInverse_VdC(int bits) {
    bits = (bits << 16) | (bits >> 16);
    bits = ((bits & 0x55555555) << 1) | ((bits & 0xAAAAAAAA) >> 1);
    bits = ((bits & 0x33333333) << 2) | ((bits & 0xCCCCCCCC) >> 2);
    bits = ((bits & 0x0F0F0F0F) << 4) | ((bits & 0xF0F0F0F0) >> 4);
    bits = ((bits & 0x00FF00FF) << 8) | ((bits & 0xFF00FF00) >> 8);
    return float(bits) * 2.3283064365386963e-10; // / 0x100000000
}

vec2 Hammersley(int i, int N) {
    return vec2(float(i) / float(N), RadicalInverse_VdC(i));
}

#else

float VanDerCorpus(int n, int base) {
    float invBase = 1.0 / float(base);
    float denom   = 1.0;
    float result  = 0.0;

    for(int i = 0; i < 32; ++i)
    {
        if(n > 0)
        {
            denom   = mod(float(n), 2.0);
            result += denom * invBase;
            invBase = invBase / 2.0;
            n       = int(float(n) / 2.0);
        }
    }

    return result;
}
// HammersleyNoBitOps
vec2 Hammersley(int i, int N) {
    return vec2(float(i)/float(N), VanDerCorpus(i, 2));
}
#endif

vec3 ImportanceSampleGGX(vec2 Xi, vec3 N, float roughness) {
    float a = roughness * roughness;

    float phi = 2.0 * PI * Xi.x;
    float cosTheta = sqrt((1.0 - Xi.y) / (1.0 + (a*a - 1.0) * Xi.y));
    float sinTheta = sqrt(1.0 - cosTheta * cosTheta);

    // from spherical coordinates to cartesian coordinates
    vec3 H;
    H.x = cos(phi) * sinTheta;
    H.y = sin(phi) * sinTheta;
    H.z = cosTheta;

    // from tangent-space vector to world-space sample vector
    vec3 up        = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
    vec3 tangent   = normalize(cross(up, N));
    vec3 bitangent = cross(N, tangent);

    vec3 sampleVec = tangent * H.x + bitangent * H.y + N * H.z;
    return normalize(sampleVec);
}
