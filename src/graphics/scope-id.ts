export default class ScopeId {
    public name: string;
    public value: any;

    constructor(name) {
        this.name = name;
        this.value = null;
    }

    public getValue() {
        return this.value;
    }

    public setValue(value: any) {
        this.value = value;
    }
}
