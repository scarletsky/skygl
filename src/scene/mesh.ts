import Node from "./node";
import Geometry from "./geometry";

export default class Mesh extends Node {
    public geometry: Geometry;

    constructor(geometry: Geometry) {
        super();
        this.geometry = geometry;
    }
}
