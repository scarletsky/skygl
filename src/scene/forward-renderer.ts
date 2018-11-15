import Device from "graphics/device";
import Scene from "./scene";
import Camera from "./camera";
import Node from "./node";
import Mesh from "./mesh";
import Light, { SortedLights } from "./light";

function backToFront(a: Node, b: Node) {
    return b.worldPosition.z - a.worldPosition.z;
}

function frontToBack(a: Node, b: Node) {
    return a.worldPosition.z - b.worldPosition.z;
}

export default class ForwardRenderer {
    private device: Device;
    private meshes = [] as Mesh[];
    private lights = [[], [], []] as SortedLights;

    constructor(device: Device) {
        this.device = device;
    }

    private prepare(node: Node) {
        if (!node.enabled) return;

        if (node instanceof Mesh) {
            this.meshes.push(node);
        } else if (node instanceof Light) {
            this.lights[node.type].push(node);
        }

        for (const child of node.children) {
            this.prepare(child);
        }
    }

    public render(scene: Scene, camera: Camera) {
        let material, shader;
        let device = this.device;
        let scope = device.scope;
        let programlib = device.programlib;

        this.meshes.length = 0;
        this.lights.forEach((lights) => lights.length = 0);
        Scene.setCurrentScene(scene);

        if (scene.autoUpdate) scene.updateWorldMatrix();
        if (camera.parent === null) camera.updateWorldMatrix();

        this.prepare(scene);
        this.meshes.sort(frontToBack);

        scene.apply(device);
        scope.setValue("uViewPosition", camera.getWorldPosition());
        scope.setValue("uViewMatrix", camera.viewMatrix);
        scope.setValue("uProjectionMatrix", camera.projectionMatrix);

        this.lights.forEach(lights => {
            lights.forEach((light, index) => light.apply(device, index));
        });

        for (const mesh of this.meshes) {
            mesh.worldMatrix.invertTo3x3(mesh.normalMatrix);
            mesh.normalMatrix.transpose();
            scope.setValue("uModelMatrix", mesh.worldMatrix);
            scope.setValue("uNormalMatrix", mesh.normalMatrix);

            shader = programlib.getProgram(mesh.material, this.lights);
            material = mesh.material;
            material.apply(device);
            this.device.setShader(shader);
            this.device.draw(mesh);
        }
    }
}
