import Device from "./device";
import ScopeId from "./scope-id";

export default class ShaderInput {
    public locationId: number | WebGLUniformLocation;
    public scopeId: ScopeId;
    public dataType: number;

    constructor(device: Device, name: string, dataType: number, locationId: number | WebGLUniformLocation) {
        this.locationId = locationId;
        this.scopeId = device.scope.resolve(name);
        this.dataType = dataType;
    }
}
