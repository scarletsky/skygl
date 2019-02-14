import Node from "core/node";
import Scene from "scene/scene";
import Shadow from "./shadow";
import { Color } from "math";
import { Device } from "graphics";

export type SortedLights = [
    Light[], // directional
    Light[], // point
    Light[]  // spot
];

export default abstract class Light extends Node {
    public static TYPE_DIRECTIONAL = 0;
    public static TYPE_POINT = 1;
    public static TYPE_SPOT = 2;
    public type = Light.TYPE_DIRECTIONAL;
    public color = new Color(1, 1, 1, 1);
    public intensity = 1;
    public castShadow = true;
    public shadow = null as Shadow;

    public generateShadow(device: Device, scene: Scene, index: number) {
        if (this.castShadow) {
            this.shadow.apply(device, scene, index);
        }
    }

    public abstract apply(device: Device, index: number): void;
}
