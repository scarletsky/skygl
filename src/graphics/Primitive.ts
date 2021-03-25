import { isNumber } from 'util/index';
import { TRIANGLES, FLOAT } from './constants';

export interface PrimitiveOptions {
    mode: number;
    count: number;
    first?: number;
    type?: number;
    offset?: number;
}

export class Primitive {
    public mode: number;
    public first: number;
    public count: number;
    public type: number;
    public offset: number;

    constructor(options: PrimitiveOptions = { mode: TRIANGLES, count: 0 }) {
        this.mode = options.mode;
        this.count = options.count;
        this.first = isNumber(options.first) ? options.first : 0;
        this.type = isNumber(options.type) ? options.type : FLOAT;
        this.offset = isNumber(options.offset)  ? options.offset : 0;
    }
}
