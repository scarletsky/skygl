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
        this.first = typeof (options.first) === 'number' ? options.first : 0;
        this.type = typeof (options.type) === 'number' ? options.type : FLOAT;
        this.offset = typeof (options.offset) === 'number' ? options.offset : 0;
    }
}
