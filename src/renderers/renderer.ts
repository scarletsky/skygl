import { Device } from "graphics";
import { Scene } from "scene";
import { Camera } from "cameras";

export default abstract class Renderer {
    public device: Device;
    public abstract render(scene: Scene, camera: Camera): void;

    constructor(device: Device) {
        this.device = device;
    }
}
