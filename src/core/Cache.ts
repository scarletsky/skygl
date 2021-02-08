import { BaseObject } from './BaseObject';

export class Cache<T extends BaseObject> {
    public idCaches: { [id: number]: T };
    public nameCaches: { [name: string]: T };
    public uidCaches: { [uid: string]: T };

    constructor() {
        this.idCaches = {};
        this.nameCaches = {};
        this.uidCaches = {};
    }

    get(key: number | string) {
        if (typeof key === 'number') {
            return this.idCaches[key];
        } else {
            return this.uidCaches[key] || this.nameCaches[key];
        }
    }

    add(obj: T) {
        this.idCaches[obj.id] = obj;
        this.nameCaches[obj.name] = obj;
        this.uidCaches[obj.uid] = obj;
    }

    remove(obj: T) {
        delete this.idCaches[obj.id];
        delete this.nameCaches[obj.name];
        delete this.uidCaches[obj.uid];
    }
}
