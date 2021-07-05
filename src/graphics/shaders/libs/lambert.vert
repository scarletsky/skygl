#include <vertexDeclare>

void main() {
    gl_Position = sky_ProjectionMatrix * sky_ViewMatrix * sky_ModelMatrix * vec4(POSITION, 1.0);
}
