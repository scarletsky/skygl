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
    private meshes: Mesh[] = [];

    constructor(device: Device) {
        this.device = device;
        this.modelMatrixId = device.scope.resolve("uModelMatrix");
        this.viewMatrixId = device.scope.resolve("uViewMatrix");
        this.projectionMatrixId = device.scope.resolve("uProjectionMatrix");
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
        let scope = this.device.scope;
        let programlib = this.device.programlib;

        this.meshes.length = 0;

        if (scene.autoUpdate) scene.updateWorldMatrix();
        if (camera.parent === null) camera.updateWorldMatrix();

        this.prepare(scene);
        this.meshes.sort(frontToBack);

        this.viewMatrixId.setValue(camera.viewMatrix.data);
        this.projectionMatrixId.setValue(camera.projectionMatrix.data);

        for (const mesh of this.meshes) {
            shader = programlib.getProgram(mesh.material);
            material = mesh.material;

            for (const prop in material.uniforms) {
                scope.resolve(prop).setValue(material.uniforms[prop]);
            }

            this.modelMatrixId.setValue(mesh.worldMatrix.data);
            this.device.setShader(shader);
            this.device.draw(mesh);
        }
    }
}
