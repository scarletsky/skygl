import { Shader, ShaderSourceDefine } from './Shader';
import { shaderLibs } from './ShaderLibs';

export class ShaderRegistry {
    public caches: { [id: number]: Shader };
    public hashes: { [hash: string]: number };

    constructor() {
        this.caches = {};
        this.hashes = {};
    }

    add(shader: Shader) {
        const id = shader.id;

        if (this.caches[id]) {
            console.error(`[ShaderRegistry] ${id} existed, `, shader);
            return this;
        }

        this.caches[id] = shader;

        return this;
    }

    remove(id: number) {
        delete this.caches[id];

        return this;
    }

    get(id: number) {
        return this.caches[id];
    }

    getPreferredShader(lib: string, define: ShaderSourceDefine): Shader {
        const hash = lib + ';' + JSON.stringify(define);
        const id = this.hashes[hash];
        let shader = this.get(id);

        if (shader) return shader;

        const shaderOptions = shaderLibs.get(lib);
        shaderOptions.vertexDefine = shaderOptions.fragmentDefine = define;

        shader = new Shader(shaderOptions);
        this.hashes[hash] = shader.id;

        return shader;
    }
}
