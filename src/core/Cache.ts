import { Dictionary } from 'types';
import { isNumber } from 'utils/index';
import { BaseObject } from './BaseObject';

export class Cache<T extends BaseObject> {
    public idCaches: { [id: number]: T };
    public nameCaches: Dictionary<T>;
    public uidCaches: Dictionary<T>;

    constructor() {
        this.idCaches = {};
        this.nameCaches = {};
        this.uidCaches = {};
    }

    get(key: number | string) {
        if ( isNumber(key)) {
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
