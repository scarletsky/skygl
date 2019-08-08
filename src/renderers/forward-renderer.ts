import Renderer from "./renderer";
import Camera from "cameras/camera";
import Node from "core/node";
import Scene from "scene/scene";

function backToFront(a: Node, b: Node) {
    return b.worldPosition.z - a.worldPosition.z;
}

function frontToBack(a: Node, b: Node) {
    return a.worldPosition.z - b.worldPosition.z;
}

export default class ForwardRenderer extends Renderer {

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

        camera.apply(device);
        scene.apply(device);
        device.clear();
        for (const mesh of scene.meshes) {
            shader = programlib.getProgram(mesh, scene);
            mesh.apply(device);
            material = mesh.material;
            material.apply(device);
            device.setShader(shader);
            device.draw(mesh);
        }

        if (scene.skybox) {
            shader = programlib.getProgram(scene.skybox.material, scene);
            scene.skybox.apply(device, camera);
            scene.skybox.material.apply(device);
            device.setShader(shader);
            device.draw(scene.skybox);
        }
    }
}
