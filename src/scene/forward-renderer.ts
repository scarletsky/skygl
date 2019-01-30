import Device from "graphics/device";
import Scene from "./scene";
import Camera from "./camera";
import Node from "./node";

function backToFront(a: Node, b: Node) {
    return b.worldPosition.z - a.worldPosition.z;
}

function frontToBack(a: Node, b: Node) {
    return a.worldPosition.z - b.worldPosition.z;
}

export default class ForwardRenderer {
    private device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    public render(scene: Scene, camera: Camera) {
        let material, shader;
        let device = this.device;
        let programlib = device.programlib;

        Scene.setCurrentScene(scene);

        if (scene.autoUpdate) scene.updateWorldMatrix();
        if (camera.parent === null) camera.updateWorldMatrix();

        scene.prepare();
        scene.meshes.sort(frontToBack);

        scene.lights.forEach(lights => {
            lights.forEach((light, index) => light.apply(device, index));
        });

        scene.apply(device);
        camera.apply(device);

        for (const mesh of scene.meshes) {
            shader = programlib.getProgram(mesh.material, scene);
            mesh.apply(device);
            material = mesh.material;
            material.apply(device);
            this.device.setShader(shader);
            this.device.draw(mesh);
        }
    }
}
