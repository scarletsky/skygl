import { isNumber, isBoolean } from 'util/index';
import { FLOAT } from 'graphics/constants';

export enum VertexAttributeSemantic {
    POSITION = 'POSITION',
    NORMAL = 'NORMAL',
    TANGENT = 'TANGENT',
    COLOR_0 = 'COLOR_0',
    TEXCOORD_0 = 'TEXCOORD_0',
}

export interface VertexAttributeOptions {
    semantic?: VertexAttributeSemantic,
    size?: number;
    type?: number;
    normalized?: boolean;
    stride?: number;
    offset?: number;
}

export class VertexAttribute {

    static DEFAULT_VALUES_MAP = {
        [VertexAttributeSemantic.POSITION]: {
            size: 3,
            type: FLOAT,
        },
        [VertexAttributeSemantic.NORMAL]: {
            size: 3,
            type: FLOAT,
        },
        [VertexAttributeSemantic.TANGENT]: {
            size: 3,
            type: FLOAT,
        },
        [VertexAttributeSemantic.COLOR_0]: {
            size: 3,
            type: FLOAT,
        },
        [VertexAttributeSemantic.TEXCOORD_0]: {
            size: 2,
            type: FLOAT,
        },
    };

    public semantic: VertexAttributeSemantic;
    public size: number;
    public type: number;
    public normalized: boolean;
    public stride: number;
    public offset: number;

    constructor(options: VertexAttributeOptions = {}) {

        const DEFAULT_VALUES_MAP = VertexAttribute.DEFAULT_VALUES_MAP;

        this.semantic = options.semantic || VertexAttributeSemantic.POSITION;
        this.size = isNumber(options.size) ? (options.size as number) : DEFAULT_VALUES_MAP[this.semantic].size;
        this.type = isNumber(options.type) ? (options.type as number) : DEFAULT_VALUES_MAP[this.semantic].type;
        this.normalized = isBoolean(options.normalized) ? (options.normalized as boolean) : false;
        this.stride = isNumber(options.stride) ? (options.stride as number) : 0;
        this.offset = isNumber(options.offset) ? (options.offset as number) : 0;
    }
}
