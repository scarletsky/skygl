export interface UniformScopeInputOptions {

}

export class UniformScopeInput {
    public value: any;

    constructor() {
        this.value = null;
    }

    getValue() {
        return this.value;
    }

    setValue(value: any) {
        this.value = value;
    }
}
