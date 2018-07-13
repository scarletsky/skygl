import Node from "./node";
import Geometry from "./geometry";
import Material from "./material";

export default class Mesh extends Node {
    public geometry: Geometry;
    public material: Material;

    constructor(geometry: Geometry, material: Material) {
        super();
        this.geometry = geometry;
        this.material = material;
    }
}
