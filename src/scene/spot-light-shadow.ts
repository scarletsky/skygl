import Shadow from "./shadow";
import Scene from "./scene";
import { Device, Texture, RenderTarget } from "graphics";
import PerspectiveCamera from "scene/perspective-camera";
import SpotLight from "scene/spot-light";

export default class SpotLightShadow extends Shadow {

    public light: SpotLight;
    public camera = null as PerspectiveCamera;

    constructor(light: SpotLight) {
        super();
        this.size = 1024;
        this.light = light;
        this.camera = new PerspectiveCamera({
            renderTarget: new RenderTarget({
                colorBuffer: new Texture({
                    width: this.size,
                    height: this.size,
                    mipmaps: false,
                    magFilter: Texture.NEAREST,
                    minFilter: Texture.NEAREST,
                    wrapS: Texture.CLAMP_TO_EDGE,
                    wrapT: Texture.CLAMP_TO_EDGE,
                }),
                depthBuffer: new Texture({
                    width: this.size,
                    height: this.size,
                    mipmaps: false,
                    magFilter: Texture.NEAREST,
                    minFilter: Texture.NEAREST,
                    wrapS: Texture.CLAMP_TO_EDGE,
                    wrapT: Texture.CLAMP_TO_EDGE,
                    format: Texture.DEPTH_COMPONENT,
                    internalFormat: Texture.DEPTH_COMPONENT32F,
                    internalFormatType: Texture.FLOAT
                })
            })
        });
    }

    public apply(device: Device, scene: Scene, index: number) {
        const scope = device.scope;
        const canvas = device.canvas;
        const camera = this.camera;
        const light = this.light;
        const material = Shadow.DEPTH_MATERIAL;
        const uniformPrefix = `uSpotLightShadows[${index}].`;
        const shader = device.programlib.getProgram(material, scene);
        camera.setWorldPosition2(light.getWorldPosition());
        camera.setWorldRotation(light.getWorldRotation());
        camera.rotateLocal(-90, 0, 0);
        camera.updateWorldMatrix();
        camera.apply(device);
        material.apply(device);
        device.setRenderTarget(camera.renderTarget);
        device.setShader(shader);
        device.clear();
        device.setViewport(0, 0, this.size, this.size);
        device.setColorWrite(false ,false ,false ,false);

        for (const mesh of scene.meshes) {
            mesh.apply(device);
            device.draw(mesh);
        }

        device.setRenderTarget(null);
        device.setViewport(0, 0, canvas.width, canvas.height);
        device.setColorWrite(true, true, true, true);

        this.matrix.set([
            0.5, 0.0, 0.0, 0.0,
            0.0, 0.5, 0.0, 0.0,
            0.0, 0.0, 0.5, 0.0,
            0.5, 0.5, 0.5, 1.0
        ]);
        this.matrix.mul(camera.projectionMatrix);
        this.matrix.mul(camera.viewMatrix);
        scope.setValue(uniformPrefix + "type", this.type);
        scope.setValue(uniformPrefix + "bias", this.bias);
        scope.setValue(uniformPrefix + "size", this.size);
        scope.setValue(uniformPrefix + "matrix", this.matrix);
        scope.setValue(`uSpotLightShadowMaps[${index}]`, camera.renderTarget.depthBuffer);
    }
}
