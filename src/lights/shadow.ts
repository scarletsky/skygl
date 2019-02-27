import { Device } from "graphics";
import { Mat4 } from "math";
import Scene from "scene/scene";
import DepthMaterial from "materials/depth-material";

export default abstract class Shadow {
    public static TYPE_PCF = 0;
    public static DEPTH_MATERIAL = new DepthMaterial();

    public type = Shadow.TYPE_PCF;
    public bias = 0.005;
    public size = 1024;
    public distance = 16;
    public matrix = new Mat4();

    public abstract apply(device: Device, scene: Scene, index: number): void;
}
