import { Shader, ShaderOptions } from './Shader';
import { Dictionary } from 'types';

export type ShaderLibOptions = Dictionary<ShaderOptions>;

export class ShaderLib  {
    public caches: ShaderLibOptions;

    constructor(options: ShaderLibOptions = {}) {
        this.caches = {};
        this.fromJSON(options);
    }

    add(name: string) {

    }

    remove(name: string) {
        delete this.caches[name];

        return this;
    }

    get(name: string) {
        return this.caches[name];
    }

    fromJSON(options: ShaderLibOptions) {

    }

    toJSON() {
        const result = {} as ShaderLibOptions;
        const lib = this.caches;

        for (let name in lib) {
            result[name] = lib[name];
        }

        return result;
    }
}

export const shaderLib = new ShaderLib();
