import Shadow from "./shadow";
import Scene from "./scene";
import { Device, Texture, RenderTarget } from "graphics";
import OrthographicCamera from "scene/orthographic-camera";
import DirectionalLight from "scene/directional-light";

export default class DirectionalLightShadow extends Shadow {

    public light: DirectionalLight;
    public camera = null as OrthographicCamera;

    constructor(light: DirectionalLight) {
        super();
        this.size = 798;
        this.light = light;
        this.camera = new OrthographicCamera({
            left: 10,
            right: -10,
            top: 10,
            bottom: -10,
            near: -10,
            far: 20,
            renderTarget: new RenderTarget({
                // colorBuffer: new Texture({
                //     width: this.size,
                //     height: this.size,
                //     mipmaps: false,
                //     magFilter: Texture.NEAREST,
                //     minFilter: Texture.NEAREST,
                //     wrapS: Texture.CLAMP_TO_EDGE,
                //     wrapT: Texture.CLAMP_TO_EDGE,
                // }),
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
        const camera = this.camera;
        const light = this.light;
        const material = Shadow.DEPTH_MATERIAL;
        const uniformPrefix = `uDirectionalLightShadows[${index}].`;
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

        for (const mesh of scene.meshes) {
            mesh.apply(device);
            device.draw(mesh);
        }

        device.setRenderTarget(null);

        this.matrix.mul2(camera.projectionMatrix, camera.viewMatrix);
        scope.setValue(uniformPrefix + "type", this.type);
        scope.setValue(uniformPrefix + "bias", this.bias);
        scope.setValue(uniformPrefix + "size", this.size);
        scope.setValue(uniformPrefix + "matrix", this.matrix);
        scope.setValue(`uDirectionalLightShadowMaps[${index}]`, camera.renderTarget.depthBuffer);
    }
}
