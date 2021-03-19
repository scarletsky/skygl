export interface ShaderChunksOptions {
    [name: string]: string;
}

export class ShaderChunks {
    public chunks: { [name: string]: string };

    constructor(_options: ShaderChunksOptions = {}) {
        this.chunks = {};
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
