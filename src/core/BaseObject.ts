let nextId = 0;

export class BaseObject {
    public id: number;
    public name: string;
    public uid: string;

    constructor() {
        this.id = nextId++;
        this.name = '';
        this.uid = '';
    }
}
