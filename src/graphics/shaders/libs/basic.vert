#include <vertexDefinition>

void main() {
    gl_Position = sky_ProjectionMatrix * sky_ViewMatrix * sky_ModelMatrix * POSITION;
}
