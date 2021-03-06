import { Node, NodeOptions } from './Node';
import { Dictionary } from 'types';
import { ShaderSourceDefine } from 'graphics';

export interface SceneOptions extends NodeOptions {

}

export class Scene extends Node {

    constructor(options: Partial<SceneOptions> = {}) {
        super(options);
    }

}
