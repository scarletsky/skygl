import { isString, uuid } from 'utils/index';

let nextId = 0;
const DEFAULT_NODE_NAME = '';
const DEFAULT_NODE_UID = '';

export interface BaseObjectOptions {
    name: string;
    uid: string;
}

export class BaseObject {
    public id: number;
    public name: string;
    public uid: string;

    constructor() {
        this.id = nextId++;
        this.name = DEFAULT_NODE_NAME;
        this.uid = DEFAULT_NODE_UID;
    }

    fromJSON(options: Partial<BaseObjectOptions>) {
        if (isString(options.name)) {
            this.name = options.name;
        }

        if (isString(options.uid)) {
            this.uid = options.uid;
        }
    }

    toJSON(): BaseObjectOptions {
        return {
            name: this.name,
            uid: this.uid
        };
    }
}
