#include <baseFS>
#include <cubemapCommonFS>

#define SAMPLE_COUNT 1024

uniform samplerCube uEnvironmentMap;
uniform float uRoughness;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec3 N = normalize(vPosition);
    vec3 R = N;
    vec3 V = R;

    float totalWeight = 0.0;
    vec3 prefilteredColor = vec3(0.0);

    for(int i = 0; i < SAMPLE_COUNT; ++i) {

        vec2 Xi = Hammersley(i, SAMPLE_COUNT);
        vec3 H = ImportanceSampleGGX(Xi, N, uRoughness);
        vec3 L = normalize(2.0 * dot(V, H) * H - V);

        float NdotL = max(dot(N, L), 0.0);
        if(NdotL > 0.0) {
            prefilteredColor += textureCube(uEnvironmentMap, L).rgb * NdotL;
            totalWeight += NdotL;
        }
    }

    prefilteredColor = prefilteredColor / totalWeight;

    gl_FragColor = vec4(prefilteredColor, 1.0);
}
