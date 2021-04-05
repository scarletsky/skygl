import { Cache } from 'core/Cache';
import { Shader, ShaderOptions } from './Shader';
import { Dictionary } from 'types';

export type ShaderLibOptions = Dictionary<ShaderOptions>;

export class ShaderLib  {
    public lib: ShaderLibOptions;
    public cache: Cache<Shader>;

    constructor(options: ShaderLibOptions = {}) {
        this.lib = {};
        this.cache = new Cache();
        this.fromJSON(options);
    }

    add(name: string) {

    }

    remove(name: string) {
        delete this.lib[name];

        return this;
    }

    get(name: string) {
        return this.lib[name];
    }

    fromJSON(options: ShaderLibOptions) {

    }

    toJSON() {
        const result = {} as ShaderLibOptions;
        const lib = this.lib;

        for (let name in lib) {
            result[name] = lib[name];
        }

        return result;
    }
}

export const shaderLib = new ShaderLib();
