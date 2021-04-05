import { Nullable, TypedArray } from 'types';
import { Device } from 'graphics/Device';
import { STATIC_DRAW } from 'graphics/constants';

export interface BufferOptions {
    target?: number;
    srcData?: TypedArray;
    usage?: number;
}

export class Buffer {
    public target: number;
    public srcData: Nullable<TypedArray>;
    public usage: number;
    public _inited: boolean;
    public _destroying: boolean;
    public _destroyed: boolean;
    public _glBufferId: Nullable<WebGLBuffer>;

    constructor(options: BufferOptions = {}) {
        this.target = options.target || -1;
        this.srcData = options.srcData || null;
        this.usage = options.usage || STATIC_DRAW;

        this._inited = false;
        this._destroying = false;
        this._destroyed = false;
        this._glBufferId = null;
    }

    destroy() {
        this._destroying = true;
    }

    onGLCreate(device: Device) {
        if (this._inited) return;
        if (this._glBufferId) return;

        const gl = device.gl;

        if (!gl) {
            console.error('[Buffer] No WebGLContext found.');
            return;
        }

        if (this.target === -1) {
            console.error('[Buffer] target invalid.');
            return;
        }

        if (this.srcData === null) {
            console.error('[Buffer] srcData invalid.');
            return;
        }

        this._glBufferId = gl.createBuffer();
        gl.bindBuffer(this.target, this._glBufferId);
        gl.bufferData(this.target, this.srcData, this.usage);
        this._inited = true;
    }

    onGLDelete(device: Device) {
        if (this._destroyed || !this._destroying) return;
        if (!this._glBufferId) {
            console.error('[Buffer] No glBufferId found');
            return;
        }

        const gl = device.gl;

        if (gl) {
            gl.deleteBuffer(this._glBufferId);
            this._glBufferId = null;
            this._destroying = false;
            this._destroyed = true;
        }
    }

    onGLBind(device: Device) {
        const gl = device.gl as WebGLRenderingContext;

        if (!this._glBufferId) {
            console.error('[Buffer] No glBufferId found.');
            return;
        }

        gl.bindBuffer(this.target, this._glBufferId);
    }

    onGLUnbind(device: Device) {
        const gl = device.gl as WebGLRenderingContext
        gl.bindBuffer(this.target, null);
    }
}
