export default class ShaderAttribute {
    public name: string;
    public type: number;
    public size: number;
    public location: number;

    constructor(info: WebGLActiveInfo, location: number) {
        this.name = info.name;
        this.type = info.type;
        this.size = info.size;
        this.location = location;
    }
}
