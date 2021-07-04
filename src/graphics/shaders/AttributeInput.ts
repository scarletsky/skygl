export interface AttributeInputOptions {
    name: string;
    type: number;
    location: number;
}

export class AttributeInput {
    public name: string;
    public type: number;
    public location: number;

    constructor(options: AttributeInputOptions) {
        this.name = options.name;
        this.type = options.type;
        this.location = options.location;
    }
}
