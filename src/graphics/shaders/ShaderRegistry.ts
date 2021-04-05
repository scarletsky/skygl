import { Shader } from './Shader';

export class ShaderRegistry {
    public shaders: { [id: number]: Shader };

    constructor() {
        this.shaders = {};
    }

    add(id: number, shader: Shader) {
        if (this.shaders[id]) {
            console.error(`[ShaderRegistry] ${id} existed, `, shader);
            return this;
        }

        this.shaders[id] = shader;

        return this;
    }

    remove(id: number) {
        delete this.shaders[id];

        return this;
    }

    get(id: number) {
        return this.shaders[id];
    }
}
