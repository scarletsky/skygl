import { Dictionary } from 'types';
import * as chunks from './chunks';

export type ShaderChunksOptions = Dictionary<string>;

export class ShaderChunks {
    public chunks: ShaderChunksOptions;

    constructor(options: ShaderChunksOptions = {}) {
        this.chunks = {};
        this.fromJSON(options);
    }

    add(name: string, chunk: string) {
        if (this.chunks[name]) {
            console.error(`[ShaderChunks] ${name} existed.`);
            return this;
        }

        this.chunks[name] = chunk;
        return this;
    }

    remove(name: string) {
        delete this.chunks[name];

        return this;
    }

    get(name: string) {
        return this.chunks[name] || '';
    }

    fromJSON(options: ShaderChunksOptions) {
        for (let name in options) {
            this.add(name, options[name]);
        }
    }

    toJSON() {
        const result = {} as ShaderChunksOptions;
        const chunks = this.chunks;

        for (let name in chunks) {
            result[name] = chunks[name];
        }

        return result;
    }
}

export const shaderChunks = new ShaderChunks(chunks);
