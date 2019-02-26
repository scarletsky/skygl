import Mesh from "./mesh";
import { Device } from "graphics";
import { Camera } from "cameras";
import { Mat4 } from "math";

const matA = new Mat4();

export default class Skybox extends Mesh {

    public apply(device: Device, camera: Camera) {
        const scope = device.scope;
        const programlib = device.programlib;
        const shader = programlib.getProgram(this.material);
        matA.copy(camera.viewMatrix);
        matA.data[12] = matA.data[13] = matA.data[14] = 0;
        this.material.apply(device);
        device.setShader(shader);
        scope.setValue("uViewMatrix", matA);
    }
}
