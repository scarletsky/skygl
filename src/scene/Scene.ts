import { Light } from './lights';
import { Node, NodeOptions } from './Node';
import { Dictionary } from 'types';
import { Mesh } from './meshes';

export type SceneMeshes = Dictionary<Mesh>;
export type SceneLights = Dictionary<Light>;

export interface SceneOptions extends NodeOptions {

}

export class Scene extends Node {
    public meshes: SceneMeshes;
    public lights: SceneLights;

    constructor(options: SceneOptions = {}) {
        super();
        this.meshes = {};
        this.lights = {};
    }
}
