import ScopeId from "./scope-id";

interface ScopeVariables {
    [name: string]: ScopeId;
}

export default class ScopeSpace {
    public variables: ScopeVariables;

    constructor() {
        this.variables = {};
    }

    public resolve(name: string) {
        if (!this.variables[name]) {
            this.variables[name] = new ScopeId(name);
        }

        return this.variables[name];
    }

    public setValue(name: string, value: any) {
        this.variables[name] = value;
    }
}
