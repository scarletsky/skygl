import Node from "./node";
import Color from "math/color";
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

    public abstract apply(device: Device, index: number): void;
}
