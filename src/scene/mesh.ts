import Node from "core/node";
import Geometry from "geometries/geometry";
import Material from "./material";
import Device from "graphics/device";

export default class Mesh extends Node {
    public geometry: Geometry;
    public material: Material;

    constructor(geometry: Geometry, material: Material) {
        super();
        this.geometry = geometry;
        this.material = material;
    }

    public apply(device: Device) {
        const scope = device.scope;
        this.worldMatrix.invertTo3x3(this.normalMatrix);
        this.normalMatrix.transpose();
        scope.setValue("uModelMatrix", this.worldMatrix);
        scope.setValue("uNormalMatrix", this.normalMatrix);
    }
}
