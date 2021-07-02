import {
    Node,
    Scene,
    Camera,
    Mesh,
    Light,
    AmbientLight,
    DirectionalLight,
    PointLight,
    SpotLight,
    Material
} from 'scene';
import { isNil } from 'utils';

export type OpaqueMeshes = Mesh[];
export type TransparentMeshes = Mesh[];
export type SortedLights = Light[][];
export enum SortedLightsIndex {
    AMBIENT = 0,
    DIRECTIONAL,
    SPOT,
    POINT
}

export class RenderState {
    public opaqueMeshes: OpaqueMeshes;
    public transparentMeshes: TransparentMeshes;
    public lights: SortedLights;

    constructor(scene: Scene, camera: Camera) {
        this.opaqueMeshes = [];
        this.transparentMeshes = [];
        this.lights = [];
        this.prepare(scene, camera);
    }

    prepare(scene: Scene, camera: Camera) {
        this.prepareCamera(camera);

        scene.traverse((node: Node) => {
            if (!node.enabled) return;

            if (node instanceof Mesh) {
                this.prepareMesh(node);
            } else if (node instanceof Light) {
                this.prepareLight(node);
            }
        });

    }

    prepareCamera(camera: Camera) {

    }

    prepareMesh(mesh: Mesh) {
        if (mesh.material.transparent) {
            this.transparentMeshes.push(mesh);
        } else {
            this.opaqueMeshes.push(mesh);
        }
    }

    prepareLight(light: Light) {
        let idx = -1;

        if (light instanceof AmbientLight) {
            idx = SortedLightsIndex.AMBIENT;
        } else if (light instanceof DirectionalLight) {
            idx = SortedLightsIndex.DIRECTIONAL;
        } else if (light instanceof SpotLight) {
            idx = SortedLightsIndex.SPOT;
        } else if (light instanceof PointLight) {
            idx = SortedLightsIndex.POINT;
        }

        if (idx >= 0) {
            if (isNil(this.lights[idx])) {
                this.lights[idx] = [];
            }

            this.lights[idx].push(light);
        }
    }

    prepareMaterial(material: Material) {

    }

    getShaderSourceDefine(scene: Scene, mesh: Mesh, material: Material) {

    }
}
