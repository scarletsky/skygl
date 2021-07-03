import { Dictionary } from 'types';
import * as chunks from './chunks';

export type ShaderChunksOptions = Dictionary<string>;

export class ShaderChunks {
    public caches: ShaderChunksOptions;

    constructor(options: ShaderChunksOptions = {}) {
        this.caches = {};
        this.fromJSON(options);
    }

    add(name: string, chunk: string) {
        if (this.caches[name]) {
            console.error(`[ShaderChunks] ${name} existed.`);
            return this;
        }

        this.caches[name] = chunk;
        return this;
    }

    remove(name: string) {
        delete this.caches[name];

        return this;
    }

    get(name: string) {
        return this.caches[name] || '';
    }

    fromJSON(options: ShaderChunksOptions) {
        for (let name in options) {
            this.add(name, options[name]);
        }
    }

    toJSON() {
        const result = {} as ShaderChunksOptions;
        const caches = this.caches;

        for (let name in caches) {
            result[name] = caches[name];
        }

        return result;
    }
}

export const shaderChunks = new ShaderChunks();
shaderChunks.fromJSON(chunks);
