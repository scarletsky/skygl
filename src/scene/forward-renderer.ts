import Device from "../graphics/device";
import Scene from "./scene";
import Camera from "./camera";
import Node from "./node";
import Mesh from "./mesh";

function backToFront(a: Node, b: Node) {
    return b.position.z - a.position.z;
}

function frontToBack(a: Node, b: Node) {
    return a.position.z - b.position.z;
}

export default class ForwardRenderer {
    private device: Device;
    private meshes: Mesh[] = [];

    constructor(device: Device) {
        this.device = device;
    }

    private prepare(node: Node) {
        if (node instanceof Mesh) {
            this.meshes.push(node);
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

        if (scene.autoUpdate) scene.updateWorldMatrix();
        if (camera.parent === null) camera.updateWorldMatrix();

        this.prepare(scene);
        this.meshes.sort(frontToBack);

        scope.setValue("uViewMatrix", camera.viewMatrix.data);
        scope.setValue("uProjectionMatrix", camera.projectionMatrix.data);

        for (const mesh of this.meshes) {
            scope.setValue("uModelMatrix", mesh.worldMatrix.data);

            shader = programlib.getProgram(mesh.material);
            material = mesh.material;
            material.apply(device);
            this.device.setShader(shader);
            this.device.draw(mesh);
        }
    }
}
