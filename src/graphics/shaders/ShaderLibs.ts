import { ShaderOptions } from './Shader';
import { Dictionary } from 'types';
import * as libs from './libs';

export type ShaderLibOptions = Dictionary<ShaderOptions>;

export class ShaderLibs  {
    public caches: ShaderLibOptions;

    constructor(options: ShaderLibOptions = {}) {
        this.caches = {};
        this.fromJSON(options);
    }

    add(name: string, lib: ShaderOptions) {
        if (this.caches[name]) {
            console.error(`[ShaderLibs] ${name} existed.`);
            return;
        }

        this.caches[name] = lib;
        return this;
    }

    remove(name: string) {
        delete this.caches[name];

        return this;
    }

    get(name: string) {
        return this.caches[name];
    }

    fromJSON(options: ShaderLibOptions) {
        for (let name in options) {
            console.log(name, options[name])
            this.add(name, options[name]);
        }
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

export const shaderLibs = new ShaderLibs();
shaderLibs.fromJSON(libs)
