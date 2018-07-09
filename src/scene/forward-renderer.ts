import Device from "../graphics/device";
import ScopeId from "../graphics/scope-id";
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
    private modelMatrixId: ScopeId;
    private viewMatrixId: ScopeId;
    private projectionMatrixId: ScopeId;
    private meshes: Node[] = [];

    constructor(device: Device) {
        this.device = device;
        this.modelMatrixId = device.scope.resolve("modelMatrix");
        this.viewMatrixId = device.scope.resolve("viewMatrix");
        this.projectionMatrixId = device.scope.resolve("projectionMatrix");
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
        this.meshes.length = 0;

        if (scene.autoUpdate) scene.updateWorldMatrix();
        if (camera.parent === null) camera.updateWorldMatrix();

        this.prepare(scene);
        this.meshes.sort(frontToBack);

        this.viewMatrixId.setValue(camera.viewMatrix.data);
        this.projectionMatrixId.setValue(camera.projectionMatrix.data);

        for (let mesh of this.meshes) {
            this.modelMatrixId.setValue(mesh.worldMatrix.data);
            this.device.draw(mesh as Mesh);
        }
    }
}
