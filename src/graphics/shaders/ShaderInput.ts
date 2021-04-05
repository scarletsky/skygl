export interface ShaderInputOptions {
    name: string;
    type: number;
    location: number | WebGLUniformLocation;
}

export class ShaderInput {
    public name: string;
    public type: number;
    public location: number | WebGLUniformLocation;

    constructor(options: ShaderInputOptions) {
        this.name = options.name;
        this.type = options.type;
        this.location = options.location;
    }
}
