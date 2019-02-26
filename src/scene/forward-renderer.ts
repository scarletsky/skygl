import Device from "graphics/device";
import Camera from "cameras/camera";
import Node from "core/node";
import Scene from "./scene";

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
            lights.forEach((light, index) => {
                light.generateShadow(device, scene, index);
                light.apply(device, index);
            });
        });

        scene.apply(device);
        camera.apply(device);
        device.clear();
        for (const mesh of scene.meshes) {
            shader = programlib.getProgram(mesh.material, scene);
            mesh.apply(device);
            material = mesh.material;
            material.apply(device);
            device.setShader(shader);
            device.draw(mesh);
        }

        if (scene.skybox) {
            scene.skybox.apply(device, camera);
            device.draw(scene.skybox);
        }
    }
}
