import { isString, uuid } from 'utils/index';

let nextId = 0;
const DEFAULT_NAME = '';
const DEFAULT_UID = '';

export interface BaseObjectOptions {
    name: string;
    uid: string;
}

export class BaseObject {
    public id = nextId++;
    public name = DEFAULT_NAME;
    public uid = DEFAULT_UID;

    constructor(options: Partial<BaseObjectOptions> = {}) {
        this.fromJSON(options);
    }

    fromJSON(options: Partial<BaseObjectOptions>) {
        if (isString(options.name)) this.name = options.name;
        if (isString(options.uid)) this.uid = options.uid;
    }

    toJSON(): BaseObjectOptions {
        return {
            name: this.name,
            uid: this.uid
        };
    }
}
