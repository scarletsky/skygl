import { Device } from 'graphics';
import { Node } from 'scene/Node';
import { Scene } from 'scene/Scene';
import { Camera } from 'scene/cameras';
import { Mesh } from 'scene/meshes';
import {
    Light,
    AmbientLight,
    DirectionalLight,
    PointLight,
    SpotLight,
} from 'scene/lights';
import { isNil } from 'utils';
import { ShaderRegistry } from 'graphics/shaders';

export type OpaqueMeshes = Mesh[];
export type TransparentMeshes = Mesh[];
export type SortedLights = Light[][];
export enum SortedLightsIndex {
    AMBIENT = 0,
    DIRECTIONAL,
    SPOT,
    POINT
}
export type RenderStateEnvironment = {
    NUM_AMBIENT_LIGHT: number;
    NUM_DIRECTIONAL_LIGHT: number;
    NUM_SPOT_LIGHT: number;
    NUM_POINT_LIGHT: number;
}

export class RenderState {
    public opaqueMeshes: OpaqueMeshes;
    public transparentMeshes: TransparentMeshes;
    public lights: SortedLights;
    public environment: RenderStateEnvironment;


    constructor(camera: Camera, scene: Scene) {
        this.opaqueMeshes = [];
        this.transparentMeshes = [];
        this.lights = [];
        this.environment = {
            NUM_AMBIENT_LIGHT: 0,
            NUM_DIRECTIONAL_LIGHT: 0,
            NUM_SPOT_LIGHT: 0,
            NUM_POINT_LIGHT: 0,
        };
        this.prepare(camera, scene);
    }

    prepare(camera: Camera, scene: Scene) {
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
        camera.updateViewMatrix();
        camera.updateProjectionMatrix();
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
        const { environment } = this;

        if (light instanceof AmbientLight) {
            idx = SortedLightsIndex.AMBIENT;
            environment.NUM_AMBIENT_LIGHT++;
        } else if (light instanceof DirectionalLight) {
            idx = SortedLightsIndex.DIRECTIONAL;
            environment.NUM_DIRECTIONAL_LIGHT++;
        } else if (light instanceof SpotLight) {
            idx = SortedLightsIndex.SPOT;
            environment.NUM_SPOT_LIGHT++;
        } else if (light instanceof PointLight) {
            idx = SortedLightsIndex.POINT;
            environment.NUM_POINT_LIGHT++;
        }

        if (idx >= 0) {
            if (isNil(this.lights[idx])) {
                this.lights[idx] = [];
            }

            this.lights[idx].push(light);
        }
    }

    prepareShader(device: Device, mesh: Mesh) {
        const define = Object.assign(
            {},
            this.environment,
            mesh.geometry.toShaderSourceDefine(),
            mesh.material.toShaderSourceDefine()
        );
        const shaders = device.shaders as ShaderRegistry;
        const shader = shaders.getPreferredShader(mesh.material.toShaderLib(), define);
        mesh.material.onApplyShader(shader);
    }
}
