interface ScopeVariables {
    [name: string]: any;
}

export default class ScopeSpace {
    public variables: ScopeVariables;

    constructor() {
        this.variables = {};
    }

    public setValue(name: string, value: any) {
        this.variables[name] = value;
    }
}
