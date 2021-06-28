import { Node, Scene, Camera, Mesh, Light, DirectionalLight, PointLight, SpotLight } from 'scene';
import { isNil } from 'utils';

export type OpaqueMeshes = Mesh[];
export type TransparentMeshes = Mesh[];
export type DirectionLights = DirectionalLight[];
export type LayerMeshes = [OpaqueMeshes, TransparentMeshes]; // NOTE: [opaque meshes, transparent meshes]
export enum LayerMeshesIndex {
    OPAQUE = 0,
    TRANSPARENT = 1
}

export type SortedMeshes = LayerMeshes[];
export type SortedLights = Light[][];
export enum SortedLightsIndex {
    DIRECTIONAL = 0,
    SPOT = 1,
    POINT = 2
}

export class RenderState {
    public meshes: SortedMeshes;
    public lights: SortedLights;

    constructor(scene: Scene, camera: Camera) {
        this.meshes = [];
        this.lights = [];
        this.prepare(scene, camera);
    }

    prepare(scene: Scene, camera: Camera) {
        scene.traverse((node: Node) => {
            if (node instanceof Mesh) {
                this.addMesh(node);
            } else if (node instanceof Light) {
                this.addLight(node);
            }
        });
    }

    addMesh(mesh: Mesh) {
        if (isNil(this.meshes[0])) {
            this.meshes[0] = [[], []];
        }

        if (mesh.material.transparent) {
            this.meshes[0][LayerMeshesIndex.TRANSPARENT].push(mesh);
        } else {
            this.meshes[0][LayerMeshesIndex.OPAQUE].push(mesh);
        }
    }

    addLight(light: Light) {
        let idx = -1;

        if (light instanceof DirectionalLight) {
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
}
